import fs from 'fs/promises';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src', 'content');
const personalFinanceDir = path.join(contentDir, 'personal-finance');
const financialSolutionsDir = path.join(contentDir, 'financial-solutions');

async function getSlugs(dir) {
  const files = await fs.readdir(dir);
  return files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => file.replace(/\.mdx?$/, ''));
}

async function main() {
  const personalFinanceSlugs = await getSlugs(personalFinanceDir);
  const financialSolutionsSlugs = await getSlugs(financialSolutionsDir);

  const allSlugs = {
    'personal-finance': personalFinanceSlugs,
    'finanzas-personales': personalFinanceSlugs,
    'financial-solutions': financialSolutionsSlugs,
    'soluciones-financieras': financialSolutionsSlugs,
  };

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const dirsToScan = [personalFinanceDir, financialSolutionsDir];
  let brokenLinksCount = 0;

  for (const dir of dirsToScan) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(dir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      let match;

      while ((match = linkRegex.exec(content)) !== null) {
        const link = match[2];
        if (link.startsWith('/')) {
          const parts = link.split('/').filter(Boolean);
          if (parts.length === 2) {
            const [category, slug] = parts;
            if (allSlugs[category] && !allSlugs[category].includes(slug)) {
              console.log(`Broken link in ${filePath}: ${link}`);
              brokenLinksCount++;
            }
          }
        }
      }
    }
  }

  if (brokenLinksCount === 0) {
    console.log('No broken internal links found.');
  } else {
    console.log(`\nFound ${brokenLinksCount} broken internal links.`);
  }
}

main().catch(console.error);
