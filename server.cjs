const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;

// Proxy für /api Routen
if (!process.env.BACKEND_URL) {
    console.error('BACKEND_URL ist nicht in der .env definiert!');
    process.exit(1);
}

app.use('/rest', createProxyMiddleware({
    target: process.env.BACKEND_URL,
    changeOrigin: true,
    logLevel: 'debug'
}));

// MIME-Type-Konfiguration für verschiedene Dateitypen
app.use((req, res, next) => {
    const ext = path.extname(req.url).toLowerCase();
    const mimeTypes = {
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'font/otf'
    };

    if (mimeTypes[ext]) {
        res.type(mimeTypes[ext]);
    }
    next();
});

// Statische Dateien aus dem public Verzeichnis
app.use(express.static(path.join(__dirname, 'public')));

// Alle anderen Routen zur index.html weiterleiten (für SPA)
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
    console.log(`Proxy für /rest/api → ${process.env.BACKEND_URL}`);
}); 