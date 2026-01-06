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

    const categoryMatch = content.match(/\*\*Category\*\*:\s*['"]?(\w+(?:-\w+)?)['"]?/);
    if (categoryMatch) metadata.category = categoryMatch[1];

    const statusMatch = content.match(/\*\*Status\*\*:\s*['"]?(\w+)['"]?/);
    if (statusMatch) metadata.status = statusMatch[1];

    const websiteMatch = content.match(/\*\*Website\*\*:\s*(.+)/);
    if (websiteMatch) metadata.website = websiteMatch[1].trim();

    const launchMatch = content.match(/\*\*Launch Date\*\*:\s*(.+)/);
    if (launchMatch) metadata.launchDate = launchMatch[1].replace(/\(.*?\)/g, '').trim();

    const volumeMatch = content.match(/\*\*Funding Volume\*\*:\s*(.+)/);
    if (volumeMatch) metadata.fundingVolume = volumeMatch[1].replace(/\(.*?\)/g, '').trim();
  }

  return metadata;
}

function parseMechanisms(markdown) {
  const mechanisms = [];
  const mechanismsSection = markdown.match(/## Mechanisms Used\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n##|$)/);

  if (mechanismsSection) {
    const content = mechanismsSection[1];
    const bulletPoints = content.match(/^-\s+(.+)$/gm);

    if (bulletPoints) {
      bulletPoints.forEach(point => {
        const mechanism = point.replace(/^-\s+/, '').trim();
        if (mechanism) mechanisms.push(mechanism);
      });
    }
  }

  return mechanisms;
}

function parseBlockchains(markdown) {
  const blockchains = [];
  const blockchainsSection = markdown.match(/## Blockchains Supported\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n##|$)/);

  if (blockchainsSection) {
    const content = blockchainsSection[1];
    const bulletPoints = content.match(/^-\s+(.+)$/gm);

    if (bulletPoints) {
      bulletPoints.forEach(point => {
        const blockchain = point.replace(/^-\s+/, '').trim();
        if (blockchain) blockchains.push(blockchain);
      });
    }
  }

  return blockchains;
}

function parseSocialLinks(markdown) {
  const socialLinks = {};
  const socialSection = markdown.match(/## Social Links\s+([\s\S]*?)(?=\n##|$)/);

  if (socialSection) {
    const content = socialSection[1];

    const twitterMatch = content.match(/\*\*Twitter\*\*:\s*(.+)/);
    if (twitterMatch && twitterMatch[1].trim()) socialLinks.twitter = twitterMatch[1].trim();

    const discordMatch = content.match(/\*\*Discord\*\*:\s*(.+)/);
    if (discordMatch && discordMatch[1].trim()) socialLinks.discord = discordMatch[1].trim();

    const githubMatch = content.match(/\*\*GitHub\*\*:\s*(.+)/);
    if (githubMatch && githubMatch[1].trim()) socialLinks.github = githubMatch[1].trim();
  }

  return socialLinks;
}

function parseTags(markdown) {
  const tagsSection = markdown.match(/## Tags\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n##|$)/);
  if (tagsSection) {
    const content = tagsSection[1].trim();
    return content.split(',').map(t => t.trim()).filter(t => t);
  }
  return [];
}

function parseDescription(markdown) {
  const descSection = markdown.match(/## Description\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n##|---|$)/);
  return descSection ? descSection[1].trim() : '';
}

async function publishApp(issueNumber) {
  console.log(`📥 Fetching issue #${issueNumber}...`);

  const issue = await fetchIssue(issueNumber);

  if (!issue.body) {
    console.error('❌ Issue has no content');
    return;
  }

  // Extract slug from title
  const slug = issue.title
    .replace(/^\[App\]\s*/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  console.log(`📱 Creating app: ${slug}`);

  // Parse structured data from issue body
  const metadata = parseMetadata(issue.body);
  const mechanisms = parseMechanisms(issue.body);
  const blockchains = parseBlockchains(issue.body);
  const socialLinks = parseSocialLinks(issue.body);
  const tags = parseTags(issue.body);
  const description = parseDescription(issue.body);

  // Find all images
  const images = extractImages(issue.body);
  let updatedMarkdown = description;

  // Create directories
  const contentDir = path.join(process.cwd(), 'src', 'content', 'apps');
  const imagesDir = path.join(process.cwd(), 'public', 'logos');

  fs.mkdirSync(contentDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });

  // Download logo if present
  let logo = '';
  if (images.length > 0) {
    console.log(`📸 Downloading logo...`);
    const img = images[0];
    const ext = img.url.match(/\.(png|jpg|jpeg|svg|webp)/i)?.[0] || '.svg';
    const filename = `${slug}${ext}`;
    const filepath = path.join(imagesDir, filename);
    logo = `/logos/${filename}`;

    await downloadImage(img.url, filepath);
    console.log(`  ✓ ${filename}`);

    // Remove logo from markdown
    updatedMarkdown = updatedMarkdown.replace(img.markdown, '');
  }

  // Format arrays for YAML
  const mechanismsYaml = mechanisms.length > 0
    ? mechanisms.map(m => `  - ${m}`).join('\n')
    : '';

  const blockchainsYaml = blockchains.length > 0
    ? blockchains.map(b => `  - ${b}`).join('\n')
    : '';

  const tagsYaml = tags.length > 0
    ? tags.map(t => `  - "${t}"`).join('\n')
    : '';

  // Format social links for YAML
  const socialLinksYaml = Object.keys(socialLinks).length > 0
    ? Object.entries(socialLinks).map(([key, value]) => `  ${key}: "${value}"`).join('\n')
    : '';

  // Create .md file with frontmatter
  const mdContent = `---
name: "${issue.title.replace(/^\[App\]\s*/i, '')}"
slug: "${slug}"
tagline: "${metadata.tagline || ''}"
category: "${metadata.category || 'platform'}"
status: "${metadata.status || 'active'}"
website: "${metadata.website || ''}"
logo: "${logo}"
mechanisms:
${mechanismsYaml}
blockchain:
${blockchainsYaml}
launchDate: "${metadata.launchDate || new Date().toISOString().split('T')[0]}"
fundingVolume: "${metadata.fundingVolume || ''}"
socialLinks:
${socialLinksYaml}
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
  console.log(`\n👉 Next steps:`);
  console.log(`   1. Edit the frontmatter with accurate data`);
  console.log(`   2. git add .`);
  console.log(`   3. git commit -m "Add app: ${issue.title}"`);
  console.log(`   4. Close issue #${issueNumber} with "approved" label`);
}

// Run
const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-app.js <issue-number>');
  process.exit(1);
}

publishApp(issueNumber).catch(console.error);
