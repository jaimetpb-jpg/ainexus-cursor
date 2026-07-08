import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

const PRIORITY = [
  'hero-particles-bg.jpg',
  'before-after-traditional.jpg',
  'before-after-ainexus.jpg',
  'og-image.jpg',
];

async function toWebp(file, { width = 1920, quality = 80, suffix = '' } = {}) {
  const { name, ext } = parse(file);
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase())) return;
  const input = join(imagesDir, file);
  const outName = suffix ? `${name}${suffix}.webp` : `${name}.webp`;
  const output = join(imagesDir, outName);

  let pipeline = sharp(input).rotate();
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.webp({ quality }).toFile(output);
  console.log(`  ✓ ${outName}`);
}

async function main() {
  if (!existsSync(imagesDir)) {
    console.error('No images dir:', imagesDir);
    process.exit(1);
  }

  const files = readdirSync(imagesDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
  console.log(`Optimizing ${files.length} images…`);

  const ordered = [
    ...PRIORITY.filter((f) => files.includes(f)),
    ...files.filter((f) => !PRIORITY.includes(f)),
  ];

  for (const file of ordered) {
    await toWebp(file, { width: 1920, quality: 82 });
    const { name } = parse(file);
    await toWebp(file, { width: 960, quality: 78, suffix: '@960' });
  }

  const hero = join(imagesDir, 'hero-particles-bg.jpg');
  if (existsSync(hero)) {
    await sharp(hero)
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .modulate({ brightness: 1.05, saturation: 1.1 })
      .webp({ quality: 85 })
      .toFile(join(imagesDir, 'hero-cinematic-mx.webp'));
    console.log('  ✓ hero-cinematic-mx.webp (enhanced)');

    await sharp(hero)
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .greyscale()
      .modulate({ brightness: 0.85 })
      .webp({ quality: 80 })
      .toFile(join(imagesDir, 'hero-control-tower.webp'));
    console.log('  ✓ hero-control-tower.webp (dark variant)');
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
