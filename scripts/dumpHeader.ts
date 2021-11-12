import fs from 'fs';
import path from 'path';

function pad(s: string): string {
    let padding = '';
    if (s.length < 16) {
        padding = new Array(16 - s.length).fill(' ').join('');
    }

    return padding + s;
}

function hex(n: number): string {
    const asHex = n.toString(16);
    
    if (asHex.length < 2) {
        return '0' + asHex;
    } else {
        return asHex;
    }
}

function main() {
    const dir = process.argv[2];

    if (!dir) {
        console.error('usage: node dumpHeader <neo files dir>');
        process.exit(1);
    }

    const dirPath = path.resolve(process.cwd(), dir);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.neo'));
    
    files.forEach(f => {
        const fullPath = path.resolve(dirPath, f);
        const buffer = fs.readFileSync(fullPath);
        const data = Array.from(buffer).slice(0, 16);

        console.log(pad(f), data.map(hex).join(','));
    });
}

main();
