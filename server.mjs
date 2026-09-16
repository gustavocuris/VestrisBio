import http from 'node:http';
import { readFile } from 'node:fs/promises';
const port = Number(process.env.PORT || 3000);
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/manifest.webmanifest', ['manifest.webmanifest', 'application/manifest+json']],
  ['/assets/fundo.jpg.jpeg', ['assets/fundo.jpg.jpeg', 'image/jpeg']],
  ['/assets/toucan-desktop.svg', ['assets/toucan-desktop.svg', 'image/svg+xml']],
  ['/assets/toucan.svg', ['assets/toucan.svg', 'image/svg+xml']],
  ['/assets/vestris.svg', ['assets/vestris.svg', 'image/svg+xml']],
]);
http.createServer(async (req, res) => {
  const file = files.get(new URL(req.url, 'http://localhost').pathname);
  if (!file) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const data = await readFile(new URL(file[0], import.meta.url));
    res.writeHead(200, { 'Content-Type': file[1], 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(500); res.end('Unable to load file'); }
}).listen(port, '0.0.0.0', () => console.log(`Vestris: http://localhost:${port}`));
