const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).alias('d', 'dir').nargs('d', 1).describe('d', 'A directory of JS files').alias('o', 'out').nargs('o', 1).describe('o', 'The output file').demandOption(['d', 'o']).argv;

let dir = argv.dir;
let outFile = argv.out;
console.log("reading from " + dir + " , writing to " + outFile);

const glob = require("glob");
files = glob.sync(dir+"/*.js");
// console.log("the files are " + files);


const jsTokens = require("js-tokens");
const fs = require("fs");

let output = {};

for (let file of files) {
	console.log("processing " + file);
	const buffer = fs.readFileSync(file);
	const jsString = buffer.toString();
	output[file] = Array.from(jsTokens(jsString), (token) => token.value);
}

fs.writeFileSync(outFile, JSON.stringify(output, null, 2));

