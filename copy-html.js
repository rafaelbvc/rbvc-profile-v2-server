const fs = require('fs-extra');

fs.copySync('src/views', 'build/views', { recursive: true });

