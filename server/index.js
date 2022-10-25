const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});
app.use('/', express.static('../dist'));
app.use('/src', express.static('src'));
app.use('/emsdk', express.static('emsdk'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3000)