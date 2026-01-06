#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
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

  const metadataSection = markdown.match(/## Metadata\s+([\s\S]*?)(?=\n##|$)/);
  if (metadataSection) {
    const content = metadataSection[1];

    const abstractMatch = content.match(/\*\*Abstract\*\*:\s*(.+)/);
    if (abstractMatch) metadata.abstract = abstractMatch[1].replace(/\(.*?\)/g, '').trim();

    const typeMatch = content.match(/\*\*Type\*\*:\s*['"]?(\w+)['"]?/);
    if (typeMatch) metadata.type = typeMatch[1];

    const authorsMatch = content.match(/\*\*Authors\*\*:\s*(.+)/);
    if (authorsMatch) {
      metadata.authors = authorsMatch[1].replace(/\(.*?\)/g, '').split(',').map(a => a.trim()).filter(a => a);
    }

    const tagsMatch = content.match(/\*\*Tags\*\*:\s*(.+)/);
    if (tagsMatch) {
      metadata.tags = tagsMatch[1].replace(/\(.*?\)/g, '').split(',').map(t => t.trim()).filter(t => t);
    }
  }

  return metadata;
}

function parseRelatedContent(markdown) {
  const related = { apps: [], mechanisms: [] };
  const relatedSection = markdown.match(/## Related Content\s+([\s\S]*?)(?=\n##|$)/);

  if (relatedSection) {
    const content = relatedSection[1];

    const appsMatch = content.match(/\*\*Related Apps\*\*:\s*(.+)/);
    if (appsMatch) {
      related.apps = appsMatch[1].replace(/\(.*?\)/g, '').split(',').map(a => a.trim()).filter(a => a);
    }

    const mechanismsMatch = content.match(/\*\*Related Mechanisms\*\*:\s*(.+)/);
    if (mechanismsMatch) {
      related.mechanisms = mechanismsMatch[1].replace(/\(.*?\)/g, '').split(',').map(m => m.trim()).filter(m => m);
    }
  }

  return related;
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

function parseSection(markdown, sectionName) {
  const section = markdown.match(new RegExp(`## ${sectionName}\\s+(?:<!--.*?-->\\s*)?([\\s\\S]*?)(?=\\n## [^#]|---|$)`));
  return section ? section[1].trim() : '';
}

function formatMarkdown(content) {
  // Preserve single line breaks by adding two spaces before them (markdown hard line break)
  // This matches GitHub's rendering behavior
  let formatted = content.replace(/([^\n\s])\n([^\n])/g, '$1  \n$2');

  // Ensure blank lines before/after bold headings (lines starting with **)
  formatted = formatted.replace(/([^\n])\n(\*\*[^*]+\*\*)\n/g, '$1\n\n$2\n\n');

  return formatted;
}

async function publishResearch(issueNumber) {
  console.log(`📥 Fetching issue #${issueNumber}...`);

  const issue = await fetchIssue(issueNumber);

  if (!issue.body) {
    console.error('❌ Issue has no content');
    return;
  }

  // Extract slug from title
  const slug = issue.title
    .replace(/^\[Research\]\s*/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  console.log(`📊 Creating research: ${slug}`);

  // Parse structured data from issue body
  const metadata = parseMetadata(issue.body);
  const related = parseRelatedContent(issue.body);
  const sources = parseSources(issue.body);
  const fullContent = parseSection(issue.body, 'Full Content');

  // Find all images
  const images = extractImages(issue.body);
  let updatedMarkdown = formatMarkdown(fullContent);

  // Create directories
  const contentDir = path.join(process.cwd(), 'src', 'content', 'research');
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'research', slug);

  fs.mkdirSync(contentDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });

  // Download and rename images
  if (images.length > 0) {
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
      const publicPath = `/images/research/${slug}/${filename}`;

      await downloadImage(img.url, filepath);
      console.log(`  ✓ ${filename}`);

      // Replace in markdown
      updatedMarkdown = updatedMarkdown.replace(
        img.markdown,
        `![${img.alt}](${publicPath})`
      );
    }
  }

  // Determine hero image path
  let heroImage = '';
  if (images.length > 0) {
    const firstImg = images[0];
    const ext = firstImg.url.match(/\.(png|jpg|jpeg|gif|webp)/i)?.[0] || '.png';
    let baseFilename = firstImg.alt ? firstImg.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'image';
    heroImage = `/images/research/${slug}/${baseFilename}${ext}`;
  }

  // Format arrays for YAML
  const authorsYaml = metadata.authors && metadata.authors.length > 0
    ? metadata.authors.map(a => `  - "${a}"`).join('\n')
    : `  - "@${issue.user.login}"`;

  const relatedAppsYaml = related.apps.length > 0
    ? related.apps.map(a => `  - ${a}`).join('\n')
    : '';

  const relatedMechanismsYaml = related.mechanisms.length > 0
    ? related.mechanisms.map(m => `  - ${m}`).join('\n')
    : '';

  const sourcesYaml = sources.length > 0
    ? sources.map(s => `  - title: "${s.title}"\n    url: "${s.url}"`).join('\n')
    : '';

  const tagsYaml = metadata.tags && metadata.tags.length > 0
    ? metadata.tags.map(t => `  - "${t}"`).join('\n')
    : '';

  // Create .md file with frontmatter
  const mdContent = `---
title: "${issue.title.replace(/^\[Research\]\s*/i, '')}"
slug: "${slug}"
abstract: "${metadata.abstract || ''}"
heroImage: "${heroImage}"
type: "${metadata.type || 'analysis'}"
authors:
${authorsYaml}
relatedApps:
${relatedAppsYaml}
relatedMechanisms:
${relatedMechanismsYaml}
dataVisualizations: []
sources:
${sourcesYaml}
tags:
${tagsYaml}
publishDate: "${new Date().toISOString().split('T')[0]}"
lastUpdated: "${new Date().toISOString().split('T')[0]}"
submittedBy: "@${issue.user.login}"
issueNumber: ${issueNumber}
---

${updatedMarkdown.trim()}
`;

  const mdPath = path.join(contentDir, `${slug}.md`);
  fs.writeFileSync(mdPath, mdContent);

  console.log(`\n✅ Published!`);
  console.log(`   📄 ${mdPath}`);
  if (images.length > 0) {
    console.log(`   📁 ${imagesDir}`);
  }
  console.log(`\n👉 Next steps:`);
  console.log(`   1. Edit the frontmatter with accurate data`);
  console.log(`   2. git add .`);
  console.log(`   3. git commit -m "Add research: ${issue.title}"`);
  console.log(`   4. Close issue #${issueNumber} with "approved" label`);
}

// Run
const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-research.js <issue-number>');
  process.exit(1);
}

publishResearch(issueNumber).catch(console.error);
