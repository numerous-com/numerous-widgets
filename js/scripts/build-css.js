const sass = require('sass');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const config = {
    input: 'src/css/styles.scss',
    output: 'src/css/styles.css',
    watchDir: 'src/css'
};

function compileSass() {
    try {
        console.log('Compiling SASS...');
        const result = sass.compile(config.input, {
            style: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded'
        });

        // Ensure output directory exists
        const outputDir = path.dirname(config.output);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(config.output, result.css);
        console.log(`✓ CSS compiled to ${config.output}`);
    } catch (error) {
        console.error('× SASS compilation failed:', error.message);
    }
}

if (process.argv.includes('--watch')) {
    console.log(`Watching ${config.watchDir} for changes...`);
    chokidar.watch(config.watchDir).on('all', (event, path) => {
        if (path.endsWith('.scss')) {
            console.log(`File ${path} changed. Recompiling...`);
            compileSass();
        }
    });
} else {
    compileSass();
} 