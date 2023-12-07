"use strict";

var 
	fs=require('fs')
	, filename=process.argv[2]
	, spawn=require("child_process").spawn;

/*console.log("Process argument 0:" + process.argv[0]);
console.log("Process argument 1:" + process.argv[1]);
console.log("Process argument 2:" + process.argv[2]);
*/

if (!filename) {
	throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() {
	console.log("File "+ filename + " just changed!");
	var ls=spawn('ls', ['-lh', filename]);
	//ls.stdout.pipe(process.stdout);
	var output="";
	ls.stdout.on('data', function(chunk){
		output += chunk.toString();
	});
	ls.on('close', function() {
		var parts=output.split(/\s+/);
		console.dir([parts[0], parts[4], parts[8]]);
	});
});

console.log("Now watching " + filename + " for changes...");
