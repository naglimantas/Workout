// Generates app icons from an SVG dumbbell design using sharp.
// Requires: npm install -D sharp
import sharp from 'sharp'
import { mkdirSync } from 'fs'

mkdirSync('public', { recursive: true })

// Dumbbell icon — dark red on near-black, rounded square
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Background -->
  <rect width="512" height="512" rx="96" fill="#0d0d0d"/>

  <!-- Left plate -->
  <rect x="64" y="168" width="76" height="176" rx="18" fill="#8b0000"/>
  <!-- Left collar -->
  <rect x="140" y="210" width="28" height="92" rx="7" fill="#5c0000"/>
  <!-- Handle -->
  <rect x="168" y="236" width="176" height="40" rx="10" fill="#8b0000"/>
  <!-- Right collar -->
  <rect x="344" y="210" width="28" height="92" rx="7" fill="#5c0000"/>
  <!-- Right plate -->
  <rect x="372" y="168" width="76" height="176" rx="18" fill="#8b0000"/>

  <!-- Subtle highlight on left plate top edge -->
  <rect x="64" y="168" width="76" height="8" rx="8" fill="#b03030" opacity="0.5"/>
  <!-- Subtle highlight on right plate top edge -->
  <rect x="372" y="168" width="76" height="8" rx="8" fill="#b03030" opacity="0.5"/>
  <!-- Handle highlight -->
  <rect x="168" y="236" width="176" height="6" rx="4" fill="#b03030" opacity="0.4"/>
</svg>`

const buf = Buffer.from(svg)

await sharp(buf).resize(512, 512).png().toFile('public/pwa-512x512.png')
await sharp(buf).resize(192, 192).png().toFile('public/pwa-192x192.png')
await sharp(buf).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(buf).resize(32, 32).png().toFile('public/favicon.ico')

console.log('Icons generated in /public')
