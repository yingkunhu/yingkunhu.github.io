"use strict";

const fs=require('fs');

if (null == process.argv[2]) {
	console.log("specify a file name!");
	return;
}
fs.exists(process.argv[2], function(exists){
	if (exists) {
		mainBody();
	} else {
		process.stdout.write("File " + process.argv[2] + " doesn't exist.");
	}
});


function mainBody() {
	const stream = fs.createReadStream(process.argv[2]);

	stream.on('data', function(data){
	  process.stdout.write(data);
	});

	stream.on('error', function(error){
		process.stderr.write("Failed to create read stream for file '" + process.argv[2] + "', error="+error+'\r\n');
	});
} //function mainBody()