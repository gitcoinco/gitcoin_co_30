#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional for private repos
const REPO = 'gitcoinco/gitcoin_co_30';

async function fetchIssue(issueNumber) {
  const url = `https://api.github.com/repos/${REPO}/issues/${issueNumber}`;

  const response = await fetch(url, {
    headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
  });

  return response.json();
}

function extractImages(markdown) {
  const images = [];

  // Find markdown-style images: ![alt](url)
  const markdownRegex = /!\[([^\]]*)\]\((https:\/\/[^\)]+)\)/g;
  let match;

  while ((match = markdownRegex.exec(markdown)) !== null) {
    images.push({
      alt: match[1],
      url: match[2],
      markdown: match[0]
    });
  }

  // Find HTML img tags: <img ... src="url" ... alt="alt" ... />
  const htmlRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

  while ((match = htmlRegex.exec(markdown)) !== null) {
    const imgTag = match[0];
    const src = match[1];

    // Extract alt attribute if present
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';

    images.push({
      alt: alt,
      url: src,
      markdown: imgTag
    });
  }

  return images;
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

function parseMetadata(markdown) {
  const metadata = {};

  // Extract from Metadata section
  const metadataSection = markdown.match(/## Metadata\s+([\s\S]*?)(?=\n##|$)/);
  if (metadataSection) {
    const content = metadataSection[1];

    const projectMatch = content.match(/\*\*Project Name\*\*:\s*(.+)/);
    if (projectMatch) metadata.project = projectMatch[1].trim();

    const platformMatch = content.match(/\*\*Platform Used\*\*:\s*(.+)/);
    if (platformMatch) metadata.platform = platformMatch[1].replace(/\(.*?\)/g, '').trim();

    const mechanismMatch = content.match(/\*\*Mechanism Type\*\*:\s*(.+)/);
    if (mechanismMatch) metadata.mechanism = mechanismMatch[1].replace(/\(.*?\)/g, '').trim();

    const amountMatch = content.match(/\*\*Funding Amount\*\*:\s*(.+)/);
    if (amountMatch) metadata.fundingAmount = amountMatch[1].replace(/\(.*?\)/g, '').trim();

    const dateMatch = content.match(/\*\*Funding Date\*\*:\s*(.+)/);
    if (dateMatch) metadata.fundingDate = dateMatch[1].trim();

    const statusMatch = content.match(/\*\*Status\*\*:\s*['"]?(\w+)['"]?/);
    if (statusMatch) metadata.status = statusMatch[1];

    const tagsMatch = content.match(/\*\*Tags\*\*:\s*(.+)/);
    if (tagsMatch) {
      metadata.tags = tagsMatch[1].replace(/\(.*?\)/g, '').split(',').map(t => t.trim()).filter(t => t);
    }
  }

  return metadata;
}

function parseSummary(markdown) {
  const summarySection = markdown.match(/## Summary\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n##|$)/);
  return summarySection ? summarySection[1].trim() : '';
}

function parseOutcomes(markdown) {
  const outcomes = [];
  const outcomesSection = markdown.match(/## Outcomes\s+([\s\S]*?)(?=\n##|$)/);

  if (outcomesSection) {
    const content = outcomesSection[1];
    const outcomeBlocks = content.split(/###\s+Outcome\s+\d+/).slice(1);

    outcomeBlocks.forEach(block => {
      const titleMatch = block.match(/\*\*Title\*\*:\s*(.+)/);
      const descMatch = block.match(/\*\*Description\*\*:\s*(.+)/);
      const metricsMatch = block.match(/\*\*Metrics\*\*:\s*(.+)/);

      if (titleMatch || descMatch) {
        outcomes.push({
          title: titleMatch ? titleMatch[1].trim() : '',
          description: descMatch ? descMatch[1].trim() : '',
          metrics: metricsMatch ? metricsMatch[1].trim() : ''
        });
      }
    });
  }

  return outcomes;
}

function parseLessonsLearned(markdown) {
  const lessons = [];
  const lessonsSection = markdown.match(/## Lessons Learned\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n##|$)/);

  if (lessonsSection) {
    const content = lessonsSection[1];
    const bulletPoints = content.match(/^-\s+(.+)$/gm);

    if (bulletPoints) {
      bulletPoints.forEach(point => {
        const lesson = point.replace(/^-\s+/, '').trim();
        if (lesson) lessons.push(lesson);
      });
    }
  }

  return lessons;
}

function parseSources(markdown) {
  const sources = [];
  const sourcesSection = markdown.match(/## Sources\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n##|---|$)/);

  if (sourcesSection) {
    const content = sourcesSection[1];
    const linkMatches = content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);

    for (const match of linkMatches) {
      if (match[1] && match[2] && match[2] !== 'URL') {
        sources.push({
          title: match[1].trim(),
          url: match[2].trim()
        });
      }
    }
  }

  return sources;
}

async function publishIssue(issueNumber) {
  console.log(`📥 Fetching issue #${issueNumber}...`);

  const issue = await fetchIssue(issueNumber);

  if (!issue.body) {
    console.error('❌ Issue has no content');
    return;
  }

  // Extract slug from title
  const slug = issue.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  console.log(`📝 Creating case study: ${slug}`);

  // Parse structured data from issue body
  const metadata = parseMetadata(issue.body);
  const summary = parseSummary(issue.body);
  const outcomes = parseOutcomes(issue.body);
  const lessonsLearned = parseLessonsLearned(issue.body);
  const sources = parseSources(issue.body);

  // Find all images
  const images = extractImages(issue.body);
  let updatedMarkdown = issue.body;

  // Create directories
  const contentDir = path.join(process.cwd(), 'src', 'content', 'case-studies');
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'case-studies', slug);

  fs.mkdirSync(contentDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });

  // Download and rename images
  console.log(`📸 Downloading ${images.length} images...`);

  const usedFilenames = new Set();
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const ext = img.url.match(/\.(png|jpg|jpeg|gif|webp)/i)?.[0] || '.png';

    let baseFilename = img.alt
      ? img.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : 'image';

    // Handle duplicate filenames by adding a counter
    let filename = `${baseFilename}${ext}`;
    let counter = 1;
    while (usedFilenames.has(filename)) {
      filename = `${baseFilename}-${counter}${ext}`;
      counter++;
    }
    usedFilenames.add(filename);

    const filepath = path.join(imagesDir, filename);
    const publicPath = `/images/case-studies/${slug}/${filename}`;

    await downloadImage(img.url, filepath);
    console.log(`  ✓ ${filename}`);

    // Replace in markdown
    updatedMarkdown = updatedMarkdown.replace(
      img.markdown,
      `![${img.alt}](${publicPath})`
    );
  }

  // Determine hero image path
  let heroImage = '';
  if (images.length > 0) {
    const firstImg = images[0];
    const ext = firstImg.url.match(/\.(png|jpg|jpeg|gif|webp)/i)?.[0] || '.png';
    let baseFilename = firstImg.alt ? firstImg.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'image';
    heroImage = `/images/case-studies/${slug}/${baseFilename}${ext}`;
  }

  // Format outcomes for YAML
  const outcomesYaml = outcomes.length > 0
    ? outcomes.map(o => `  - title: "${o.title}"\n    description: "${o.description}"\n    metrics: "${o.metrics}"`).join('\n')
    : '';

  // Format lessons learned for YAML
  const lessonsYaml = lessonsLearned.length > 0
    ? lessonsLearned.map(l => `  - "${l}"`).join('\n')
    : '';

  // Format sources for YAML
  const sourcesYaml = sources.length > 0
    ? sources.map(s => `  - title: "${s.title}"\n    url: "${s.url}"`).join('\n')
    : '';

  // Format tags for YAML
  const tagsYaml = metadata.tags && metadata.tags.length > 0
    ? metadata.tags.map(t => `  - "${t}"`).join('\n')
    : '';

  // Create .md file with frontmatter
  const mdContent = `---
title: "${issue.title}"
slug: "${slug}"
summary: "${summary || ''}"
project: "${metadata.project || ''}"
platform: "${metadata.platform || ''}"
mechanism: "${metadata.mechanism || ''}"
fundingAmount: "${metadata.fundingAmount || ''}"
fundingDate: "${metadata.fundingDate || new Date().toISOString().split('T')[0]}"
status: "${metadata.status || 'ongoing'}"
author: "@${issue.user.login}"
submittedBy: "@${issue.user.login}"
issueNumber: ${issueNumber}
publishDate: "${new Date().toISOString().split('T')[0]}"
lastUpdated: "${new Date().toISOString().split('T')[0]}"
heroImage: "${heroImage}"
outcomes:
${outcomesYaml}
lessonsLearned:
${lessonsYaml}
sources:
${sourcesYaml}
tags:
${tagsYaml}
---

${updatedMarkdown}
`;

  const mdPath = path.join(contentDir, `${slug}.md`);
  fs.writeFileSync(mdPath, mdContent);

  console.log(`\n✅ Published!`);
  console.log(`   📄 ${mdPath}`);
  console.log(`   📁 ${imagesDir}`);
  console.log(`\n👉 Next steps:`);
  console.log(`   1. Review the files`);
  console.log(`   2. git add .`);
  console.log(`   3. git commit -m "Add case study: ${issue.title}"`);
  console.log(`   4. Close issue #${issueNumber} with "approved" label`);
}

// Run
const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-case-study.js <issue-number>');
  process.exit(1);
}

publishIssue(issueNumber).catch(console.error);
