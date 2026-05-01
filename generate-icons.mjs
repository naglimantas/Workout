// Generates pwa-192x192.png, pwa-512x512.png and apple-touch-icon.png
// Uses only Node built-ins — no extra dependencies needed.
import { deflateSync } from 'zlib'
import { writeFileSync, mkdirSync } from 'fs'

function makeCRCTable() {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
}
const CRC = makeCRCTable()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ CRC[(c ^ buf[i]) & 0xff]
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const t = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])))
  return Buffer.concat([len, t, data, crcBuf])
}

function makePNG(size, r, g, b) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // RGB

  const row = Buffer.alloc(1 + size * 3) // filter byte + RGB per pixel
  for (let x = 0; x < size; x++) {
    row[1 + x * 3] = r
    row[1 + x * 3 + 1] = g
    row[1 + x * 3 + 2] = b
  }
  const raw = Buffer.concat(Array.from({ length: size }, () => row))

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

mkdirSync('public', { recursive: true })

// Dark red (#dc2626 = 220, 38, 38) — matches the app accent colour
writeFileSync('public/pwa-192x192.png', makePNG(192, 220, 38, 38))
writeFileSync('public/pwa-512x512.png', makePNG(512, 220, 38, 38))
writeFileSync('public/apple-touch-icon.png', makePNG(180, 220, 38, 38))

console.log('Icons generated in /public')
