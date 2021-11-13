import fs from 'fs';
import path from 'path';

function setName(data: number[], name: string) {
	const nameBuffer = Buffer.from(name);

	const namePaddingBuffer = Buffer.from(
		new Array(33 - name.length).fill(0, 0, 33 - name.length)
	);

	const totalBuffer = Buffer.concat([nameBuffer, namePaddingBuffer], 33);
	const totalNameData = Array.from(totalBuffer);

	data.splice(0x2c, 33, ...totalNameData);
}

function main() {
	const srcNeoFile = process.argv[2];
	const destDir = process.argv[3];

	if (!srcNeoFile || !destDir) {
		console.error('usage: node makeNeoCDByteDump <src .neo> <dest dir>');
		process.exit(1);
	}

	const srcNeoBaseFile = path.basename(srcNeoFile, '.neo');
	const srcNeoPath = path.resolve(process.cwd(), srcNeoFile);

	const srcNeoData = Array.from(fs.readFileSync(srcNeoPath));

	let offset = srcNeoData.findIndex((b) => b === 0);

	while (offset !== -1 && offset < 200) {
		srcNeoData[offset] = 9;
		setName(srcNeoData, `Metal Slug (CD) ${offset}`);

		const destPath = path.resolve(
			process.cwd(),
			destDir,
			`${srcNeoBaseFile}_${offset}.neo`
		);

		fs.writeFileSync(destPath, Buffer.from(srcNeoData));
		srcNeoData[offset] = 0;

		offset = srcNeoData.findIndex((b, i) => b === 0 && i > offset);
	}
}

main();
