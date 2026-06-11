/**
 * Generates a real, valid 1200x630 PNG Open Graph image using only Node
 * built-ins (zlib). Draws a diagonal brand gradient with a centered rounded
 * badge containing a blocky "S" monogram, matching favicon.svg branding.
 *
 * Run: node scripts/generate-og-image.mjs
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const W = 1200;
const H = 630;

// RGB framebuffer
const px = new Uint8Array(W * H * 3);

function setPixel(x, y, r, g, b) {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    const i = (y * W + x) * 3;
    px[i] = r;
    px[i + 1] = g;
    px[i + 2] = b;
}

function lerp(a, b, t) {
    return Math.round(a + (b - a) * t);
}

// Brand colors (match favicon gradient: indigo #6366f1 -> sky #0ea5e9)
const c1 = [49, 46, 129]; // deep indigo backdrop
const c2 = [14, 116, 144]; // teal backdrop

// Diagonal gradient background
for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
        const t = (x / W + y / H) / 2;
        setPixel(x, y, lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t));
    }
}

// Rounded rectangle helper
function fillRoundedRect(x0, y0, w, h, radius, color) {
    const [r, g, b] = color;
    for (let y = y0; y < y0 + h; y++) {
        for (let x = x0; x < x0 + w; x++) {
            const dx = Math.max(x0 + radius - x, x - (x0 + w - 1 - radius), 0);
            const dy = Math.max(y0 + radius - y, y - (y0 + h - 1 - radius), 0);
            if (dx * dx + dy * dy <= radius * radius) setPixel(x, y, r, g, b);
        }
    }
}

// Centered badge
const badge = 300;
const bx = Math.round((W - badge) / 2);
const by = Math.round((H - badge) / 2);
// gradient-ish badge: brighter indigo->sky
const badgeC1 = [99, 102, 241];
const badgeC2 = [14, 165, 233];
for (let y = by; y < by + badge; y++) {
    for (let x = bx; x < bx + badge; x++) {
        const radius = 56;
        const dx = Math.max(bx + radius - x, x - (bx + badge - 1 - radius), 0);
        const dy = Math.max(by + radius - y, y - (by + badge - 1 - radius), 0);
        if (dx * dx + dy * dy <= radius * radius) {
            const t = (x - bx) / badge;
            setPixel(
                x,
                y,
                lerp(badgeC1[0], badgeC2[0], t),
                lerp(badgeC1[1], badgeC2[1], t),
                lerp(badgeC1[2], badgeC2[2], t)
            );
        }
    }
}

// Blocky white "S" monogram inside badge.
// Build from 3 horizontal bars + 2 partial vertical bars on a grid.
const white = [255, 255, 255];
const m = 70; // margin inside badge
const sx = bx + m;
const sy = by + m;
const sw = badge - m * 2;
const sh = badge - m * 2;
const bar = Math.round(sh / 5); // bar thickness
function rect(x, y, w, h) {
    fillRoundedRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h), Math.round(bar / 3), white);
}
// top bar
rect(sx, sy, sw, bar);
// upper-left vertical
rect(sx, sy, bar, sh / 2);
// middle bar
rect(sx, sy + sh / 2 - bar / 2, sw, bar);
// lower-right vertical
rect(sx + sw - bar, sy + sh / 2 - bar / 2, bar, sh / 2 + bar / 2);
// bottom bar
rect(sx, sy + sh - bar, sw, bar);

// ---- Encode PNG ----
function crc32(buf) {
    let c = ~0;
    for (let i = 0; i < buf.length; i++) {
        c ^= buf[i];
        for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
    return (~c) >>> 0;
}

function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const body = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crc]);
}

// Add filter byte (0) per scanline
const raw = Buffer.alloc(H * (W * 3 + 1));
for (let y = 0; y < H; y++) {
    raw[y * (W * 3 + 1)] = 0;
    px.subarray(y * W * 3, (y + 1) * W * 3).forEach((v, i) => {
        raw[y * (W * 3 + 1) + 1 + i] = v;
    });
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type RGB
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const png = Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
]);

writeFileSync('public/og-image.png', png);
console.log(`Wrote public/og-image.png (${W}x${H}, ${png.length} bytes)`);
