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

    const taglineMatch = content.match(/\*\*Tagline\*\*:\s*(.+)/);
    if (taglineMatch) metadata.tagline = taglineMatch[1].replace(/\(.*?\)/g, '').trim();

    const statusMatch = content.match(/\*\*Status\*\*:\s*['"]?(\w+)['"]?/);
    if (statusMatch) metadata.status = statusMatch[1];

    const startDateMatch = content.match(/\*\*Start Date\*\*:\s*(.+)/);
    if (startDateMatch) metadata.startDate = startDateMatch[1].replace(/\(.*?\)/g, '').trim();

    const endDateMatch = content.match(/\*\*End Date\*\*:\s*(.+)/);
    if (endDateMatch) metadata.endDate = endDateMatch[1].replace(/\(.*?\)/g, '').trim();

    const organizerMatch = content.match(/\*\*Organizer\*\*:\s*(.+)/);
    if (organizerMatch) metadata.organizer = organizerMatch[1].replace(/\(.*?\)/g, '').trim();

    const mechanismMatch = content.match(/\*\*Mechanism\*\*:\s*(.+)/);
    if (mechanismMatch) metadata.mechanism = mechanismMatch[1].replace(/\(.*?\)/g, '').trim();

    const fundingPoolMatch = content.match(/\*\*Funding Pool\*\*:\s*(.+)/);
    if (fundingPoolMatch) metadata.fundingPool = fundingPoolMatch[1].replace(/\(.*?\)/g, '').trim();

    const matchingPoolMatch = content.match(/\*\*Matching Pool\*\*:\s*(.+)/);
    if (matchingPoolMatch) metadata.matchingPool = matchingPoolMatch[1].replace(/\(.*?\)/g, '').trim();

    const applicationUrlMatch = content.match(/\*\*Application URL\*\*:\s*(.+)/);
    if (applicationUrlMatch) metadata.applicationUrl = applicationUrlMatch[1].replace(/\(.*?\)/g, '').trim();

    const isFeaturedMatch = content.match(/\*\*Is Featured\*\*:\s*(\w+)/);
    if (isFeaturedMatch) metadata.isFeatured = isFeaturedMatch[1].toLowerCase() === 'true';

    const tagsMatch = content.match(/\*\*Tags\*\*:\s*(.+)/);
    if (tagsMatch) {
      metadata.tags = tagsMatch[1].replace(/\(.*?\)/g, '').split(',').map(t => t.trim()).filter(t => t);
    }
  }

  return metadata;
}

function parseList(markdown, sectionName) {
  const list = [];
  const section = markdown.match(new RegExp(`## ${sectionName}\\s+(?:<!--.*?-->\\s*)?([\\s\\S]*?)(?=\\n## [^#]|---|$)`));

  if (section) {
    const content = section[1];
    const bulletPoints = content.match(/^-\s+(.+)$/gm);

    if (bulletPoints) {
      bulletPoints.forEach(point => {
        const item = point.replace(/^-\s+/, '').trim();
        if (item) list.push(item);
      });
    }
  }

  return list;
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

async function publishCampaign(issueNumber) {
  console.log(`📥 Fetching issue #${issueNumber}...`);

  const issue = await fetchIssue(issueNumber);

  if (!issue.body) {
    console.error('❌ Issue has no content');
    return;
  }

  // Extract slug from title
  const slug = issue.title
    .replace(/^\[Campaign\]\s*/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  console.log(`📢 Creating campaign: ${slug}`);

  // Parse structured data from issue body
  const metadata = parseMetadata(issue.body);
  const eligibility = parseList(issue.body, 'Eligibility');
  const description = parseSection(issue.body, 'Description');

  // Find all images
  const images = extractImages(issue.body);
  let updatedMarkdown = formatMarkdown(description);

  // Create directories
  const contentDir = path.join(process.cwd(), 'src', 'content', 'campaigns');
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'campaigns', slug);

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
      const publicPath = `/images/campaigns/${slug}/${filename}`;

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
    heroImage = `/images/campaigns/${slug}/${baseFilename}${ext}`;
  }

  // Format arrays for YAML
  const eligibilityYaml = eligibility.length > 0
    ? eligibility.map(e => `  - "${e}"`).join('\n')
    : '';

  const tagsYaml = metadata.tags && metadata.tags.length > 0
    ? metadata.tags.map(t => `  - "${t}"`).join('\n')
    : '';

  // Create .md file with frontmatter
  const mdContent = `---
name: "${issue.title.replace(/^\[Campaign\]\s*/i, '')}"
slug: "${slug}"
tagline: "${metadata.tagline || ''}"
heroImage: "${heroImage}"
status: "${metadata.status || 'upcoming'}"
startDate: "${metadata.startDate || new Date().toISOString().split('T')[0]}"
endDate: "${metadata.endDate || ''}"
organizer: "${metadata.organizer || ''}"
mechanism: "${metadata.mechanism || ''}"
fundingPool: "${metadata.fundingPool || ''}"
matchingPool: "${metadata.matchingPool || ''}"
applicationUrl: "${metadata.applicationUrl || ''}"
eligibility:
${eligibilityYaml}
isFeatured: ${metadata.isFeatured || false}
tags:
${tagsYaml}
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
  console.log(`   3. git commit -m "Add campaign: ${issue.title}"`);
  console.log(`   4. Close issue #${issueNumber} with "approved" label`);
}

// Run
const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-campaign.js <issue-number>');
  process.exit(1);
}

publishCampaign(issueNumber).catch(console.error);
