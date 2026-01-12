const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Extract images from markdown
 */
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

/**
 * Download image from URL
 */
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

/**
 * Parse metadata section (only shortDescription and tags)
 */
function parseMetadata(markdown) {
  const metadata = {};

  const metadataSection = markdown.match(/## Metadata\s+([\s\S]*?)(?=\n##|$)/);
  if (metadataSection) {
    const content = metadataSection[1];

    const descMatch = content.match(/\*\*Short Description\*\*:\s*(.+)/);
    if (descMatch) metadata.shortDescription = descMatch[1].replace(/\(.*?\)/g, '').trim();

    const tagsMatch = content.match(/\*\*Tags\*\*:\s*(.+)/);
    if (tagsMatch) {
      metadata.tags = tagsMatch[1].replace(/\(.*?\)/g, '').split(',').map(t => t.trim()).filter(t => t);
    }
  }

  return metadata;
}

/**
 * Parse a section by name
 */
function parseSection(markdown, sectionName) {
  const section = markdown.match(new RegExp(`## ${sectionName}\\s+(?:<!--.*?-->\\s*)?([\\s\\S]*?)(?=\\n## [^#]|---|$)`));
  return section ? section[1].trim() : '';
}

/**
 * Parse a list section (bullet points)
 */
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

/**
 * Format markdown content
 */
function formatMarkdown(content) {
  // Preserve single line breaks by adding two spaces before them (markdown hard line break)
  // This matches GitHub's rendering behavior
  let formatted = content.replace(/([^\n\s])\n([^\n])/g, '$1  \n$2');

  // Ensure blank lines before/after bold headings (lines starting with **)
  formatted = formatted.replace(/([^\n])\n(\*\*[^*]+\*\*)\n/g, '$1\n\n$2\n\n');

  return formatted;
}

/**
 * Extract images from specific sections of markdown
 * Returns { bannerImages, logoImages, descriptionImages }
 */
function extractImagesBySections(issueBody) {
  const bannerImages = [];
  const logoImages = [];
  const descriptionImages = [];

  // Extract Banner Image section
  const bannerSection = issueBody.match(/## Banner Image\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n## [^#]|$)/);
  if (bannerSection) {
    const images = extractImages(bannerSection[1]);
    bannerImages.push(...images);
  }

  // Extract Logo section
  const logoSection = issueBody.match(/## Logo\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n## [^#]|$)/);
  if (logoSection) {
    const images = extractImages(logoSection[1]);
    logoImages.push(...images);
  }

  // Extract Description section (for any other images in the content)
  const descSection = issueBody.match(/## Description\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n## [^#]|$)/);
  if (descSection) {
    const images = extractImages(descSection[1]);
    descriptionImages.push(...images);
  }

  return { bannerImages, logoImages, descriptionImages };
}

/**
 * Download and process images (both banner and logo)
 * Returns { banner, logo, updatedMarkdown }
 */
async function processImages(issueBody, descriptionMarkdown, slug, contentType) {
  const { bannerImages, logoImages, descriptionImages } = extractImagesBySections(issueBody);
  const allImages = [...descriptionImages]; // Only process description images for markdown replacement

  if (allImages.length === 0 && bannerImages.length === 0 && logoImages.length === 0) {
    return { banner: '', logo: '', updatedMarkdown: formatMarkdown(descriptionMarkdown) };
  }

  const imagesDir = path.join(process.cwd(), 'public', 'images', contentType, slug);
  const logosDir = path.join(process.cwd(), 'public', 'logos');

  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(logosDir, { recursive: true });

  let updatedMarkdown = formatMarkdown(descriptionMarkdown);
  let banner = '';
  let logo = '';

  const totalImages = bannerImages.length + logoImages.length + allImages.length;
  if (totalImages > 0) {
    console.log(`📸 Downloading ${totalImages} images...`);
  }

  const usedFilenames = new Set();

  // Process banner image (first one from Banner Image section)
  if (bannerImages.length > 0) {
    const img = bannerImages[0];
    const ext = img.url.match(/\.(png|jpg|jpeg|gif|svg|webp)/i)?.[0] || '.png';
    let baseFilename = img.alt
      ? img.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : 'banner';

    let filename = `${baseFilename}${ext}`;
    let counter = 1;
    while (usedFilenames.has(filename)) {
      filename = `${baseFilename}-${counter}${ext}`;
      counter++;
    }
    usedFilenames.add(filename);

    const filepath = path.join(imagesDir, filename);
    const publicPath = `/images/${contentType}/${slug}/${filename}`;
    banner = publicPath;

    await downloadImage(img.url, filepath);
    console.log(`  ✓ ${filename} (banner)`);
  }

  // Process logo image (first one from Logo section)
  if (logoImages.length > 0) {
    const img = logoImages[0];
    const ext = img.url.match(/\.(png|jpg|jpeg|gif|svg|webp)/i)?.[0] || '.svg';
    let baseFilename = img.alt
      ? img.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : slug;

    let filename = `${baseFilename}${ext}`;
    let counter = 1;
    while (usedFilenames.has(filename)) {
      filename = `${baseFilename}-${counter}${ext}`;
      counter++;
    }
    usedFilenames.add(filename);

    const filepath = path.join(logosDir, filename);
    const publicPath = `/logos/${filename}`;
    logo = publicPath;

    await downloadImage(img.url, filepath);
    console.log(`  ✓ ${filename} (logo)`);
  }

  // Process description images (embedded in the content)
  for (let i = 0; i < allImages.length; i++) {
    const img = allImages[i];
    const ext = img.url.match(/\.(png|jpg|jpeg|gif|svg|webp)/i)?.[0] || '.png';

    let baseFilename = img.alt
      ? img.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : `image-${i + 1}`;

    let filename = `${baseFilename}${ext}`;
    let counter = 1;
    while (usedFilenames.has(filename)) {
      filename = `${baseFilename}-${counter}${ext}`;
      counter++;
    }
    usedFilenames.add(filename);

    const filepath = path.join(imagesDir, filename);
    const publicPath = `/images/${contentType}/${slug}/${filename}`;

    await downloadImage(img.url, filepath);
    console.log(`  ✓ ${filename}`);

    // Replace in markdown
    updatedMarkdown = updatedMarkdown.replace(
      img.markdown,
      `![${img.alt}](${publicPath})`
    );
  }

  return { banner, logo, updatedMarkdown };
}

module.exports = {
  extractImages,
  downloadImage,
  parseMetadata,
  parseSection,
  parseList,
  formatMarkdown,
  processImages
};
