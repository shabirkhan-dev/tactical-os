const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/modules/dashboard/components/admin');

function walk(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach(function(file) {
		file = path.join(dir, file);
		const stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(file));
		} else {
			if(file.endsWith('.tsx')) results.push(file);
		}
	});
	return results;
}

const files = walk(dir);

files.forEach(file => {
	let content = fs.readFileSync(file, 'utf8');
	let original = content;

	// Fix SVGs
	content = content.replace(/<svg([^>]*)>/g, '<svg$1 aria-label="icon" role="img">');

	// Fix admin-stats.tsx issues
	if (file.endsWith('admin-stats.tsx')) {
		// Fix constant condition
		content = content.replace(/\$\{1 \? "positive" : "negative"\}/g, 'positive');

		// Fix suspicious array index key (add biome-ignore)
		content = content.replace(/key=\{i\}/g, '// biome-ignore lint/suspicious/noArrayIndexKey: Static array\n\t\t\t\t\tkey={i}');
	}

	// Fix admin-sales-trend.tsx issues
	if (file.endsWith('admin-sales-trend.tsx')) {
		// Fix static element interactive
		content = content.replace(/<div\n\t\t\t\t\t\t\t\tkey=\{data\.month\}/g, '<div\n\t\t\t\t\t\t\t\trole="button"\n\t\t\t\t\t\t\t\ttabIndex={0}\n\t\t\t\t\t\t\t\tkey={data.month}');
	}

	if (original !== content) {
		fs.writeFileSync(file, content, 'utf8');
		console.log(`Fixed ${file}`);
	}
});
