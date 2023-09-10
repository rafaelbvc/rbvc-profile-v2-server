const fs = require('fs-extra');

fs.copySync('src/views', 'build/views', { recursive: true });
fs.copySync('src/public', 'build/public', { recursive: true });

