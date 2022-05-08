const memory = require("memoryjs");
const MemoryFinder = require('memfind');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
const mf = new MemoryFinder('GeometryDash.exe');
const gd = memory.openProcess("GeometryDash.exe");

function renameLevel(oldname, newname) {
	mf.find(oldname, block => {
		if (oldname.startsWith(block.get(-5, 10).toString('binary').replace(/\u0000/g, ""))) {
			block = eval(`0x0` + block.hexAddress);
			memory.writeMemory(gd.handle, block, newname, memory.STRING);
		}
	});
}

rl.question('Level name to change: ', (oldname) => {
	rl.question('New name: ', (newname) => {
		renameLevel(oldname, newname);
		rl.close();
	});
});
