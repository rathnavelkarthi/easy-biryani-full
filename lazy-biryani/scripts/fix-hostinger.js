const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// 1. Find and rename all folders starting with _
function renameUnderscoreFolders(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file.startsWith('_')) {
                const newName = file.substring(1);
                const newPath = path.join(dir, newName);
                if (fs.existsSync(newPath)) {
                    fs.rmSync(newPath, { recursive: true });
                }
                fs.renameSync(filePath, newPath);
                console.log(`Renamed ${file} to ${newName}`);
                renameUnderscoreFolders(newPath); // Recurse into renamed dir
            } else {
                renameUnderscoreFolders(filePath);
            }
        }
    });
}

if (fs.existsSync(outDir)) {
    renameUnderscoreFolders(outDir);
}

// 2. Replace all instances of /_ with / for directory paths
function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            // This is a bit risky but we are looking specifically for Next.js folder patterns
            if (content.match(/\/_next\/|\/_not-found\//)) {
                content = content.split('/_next/').join('/next/');
                content = content.split('/_not-found/').join('/not-found/');
                fs.writeFileSync(filePath, content);
                console.log(`Updated refs in ${path.relative(outDir, filePath)}`);
            }
        }
    });
}

if (fs.existsSync(outDir)) {
    walk(outDir);
    console.log('Hostinger fix complete!');
} else {
    console.error('out/ directory not found. Run npm run build first.');
}
