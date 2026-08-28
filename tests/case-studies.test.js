const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('EthicHub Case Study', () => {
  let content;
  let frontmatter;

  beforeAll(() => {
    const filePath = path.join(__dirname, '../content/case-studies/ethichub-democratizing-rural-finance-smallholder-farmers.md');
    content = fs.readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const yaml = require('js-yaml');
      frontmatter = yaml.load(frontmatterMatch[1]);
    }
  });

  test('should have valid frontmatter', () => {
    expect(frontmatter).toBeDefined();
    expect(frontmatter.title).toBe('Democratizing Rural Finance to Empower Smallholder Farmers through EthicHub');
    expect(frontmatter.slug).toBe('ethichub-democratizing-rural-finance-smallholder-farmers');
    expect(frontmatter.description).toContain('EthicHub');
    expect(frontmatter.featured).toBe(false);
  });

  test('should have correct tags', () => {
    const expectedTags = [
      'rural-finance',
      'smallholder-farmers',
      'defi',
      'public-goods',
      'regenerative-finance',
      'ethichub',
      'impact',
      'latin-america'
    ];
    
    expectedTags.forEach(tag => {
      expect(frontmatter.tags).toContain(tag);
    });
  });

  test('should have valid banner image URL', () => {
    expect(frontmatter.bannerImage).toMatch(/^https:\/\/github\.com\/user-attachments\/assets\//);
    expect(frontmatter.bannerImage).toMatch(/\.png$/);
  });

  test('should contain required sections', () => {
    const requiredSections = [
      'Overview',
      'The Problem',
      'The Solution',
      'Technical Architecture',
      'Impact',
      'Future Roadmap',
      'Conclusion'
    ];
    
    requiredSections.forEach(section => {
      expect(content).toContain(`## ${section}`);
    });
  });

  test('should mention key technologies', () => {
    expect(content).toContain('Ethereum');
