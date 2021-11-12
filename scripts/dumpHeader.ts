import fs from 'fs';
import path from 'path';

const HEADER_SIZE = 4096;

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

function ascii(n: number): string {
	if (n >= 'A'.charCodeAt(0) && n <= 'z'.charCodeAt(0)) {
		return String.fromCharCode(n);
	} else {
		return '-';
	}
}

function to32(data: number[]): number {
	return (data[3] << 24) | (data[2] << 16) | (data[1] << 8) | data[0];
}

function toNGH(data: number[]): string {
	const asHex = data.map(hex);

	return asHex.reverse().join('');
}

type FillerEntry = {
	offset: string;
	value: string;
};

type Header = {
	sizes: {
		p: number;
		s: number;
		m: number;
		v1: number;
		v2: number;
		c: number;
	};
	metadata: {
		name: string;
		manufacturer: string;
		year: number;
		genre: number;
		screenshot: number;
		NGH: string;
	};
	filler: FillerEntry[];
};

function toFiller(data: number[]): FillerEntry[] {
	return data.reduce<FillerEntry[]>((building, byte, index) => {
		if (byte === 0) {
			return building;
		} else {
			return building.concat({
				offset: hex(index),
				value: hex(byte),
			});
		}
	}, []);
}

function parse(data: number[]): Header {
	return {
		filler: toFiller(data.slice(0x52)),
		sizes: {
			p: to32(data.slice(0x4, 0x4 + 4)),
			s: to32(data.slice(0x8, 0x8 + 4)),
			m: to32(data.slice(0xc, 0xc + 4)),
			v1: to32(data.slice(0x10, 0x10 + 4)),
			v2: to32(data.slice(0x14, 0x14 + 4)),
			c: to32(data.slice(0x18, 0x18 + 4)),
		},
		metadata: {
			name: data
				.slice(0x29, 0x29 + 0x21)
				.map(ascii)
				.join(''),
			manufacturer: data
				.slice(0x4a, 0x4a + 0x11)
				.map(ascii)
				.join(''),
			year: to32(data.slice(0x1c, 0x1c + 4)),
			genre: to32(data.slice(0x20, 0x20 + 4)),
			screenshot: to32(data.slice(0x24, 0x24 + 4)),
			NGH: toNGH(data.slice(0x28, 0x28 + 4)),
		},
	};
}

function main() {
	const dirOrFile = process.argv[2];

	if (!dirOrFile) {
		console.error('usage: node dumpHeader <neo files dir | neo file>');
		process.exit(1);
	}

	let dirPath: string;
	let files: string[];

	if (dirOrFile.endsWith('.neo')) {
		const filePath = path.resolve(process.cwd(), dirOrFile);
		dirPath = path.dirname(filePath);
		files = [path.basename(filePath)];
	} else {
		dirPath = path.resolve(process.cwd(), dirOrFile);
		files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.neo'));
	}

	files.forEach((f) => {
		const fullPath = path.resolve(dirPath, f);
		const buffer = fs.readFileSync(fullPath);
		const data = Array.from(buffer).slice(0, HEADER_SIZE);

		const header = parse(data);
		console.log(f);
		console.log(JSON.stringify(header, null, 2));
	});
}

main();
