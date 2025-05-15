const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

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

// Statische Dateien aus dem dist Verzeichnis
app.use(express.static(path.join(__dirname, 'dist')));

// Alle anderen Routen zur index.html weiterleiten (für SPA)
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
}); 