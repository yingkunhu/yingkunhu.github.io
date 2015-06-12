"use strict";

const net=require('net');
const fileName=process.argv[2];
if (!fileName) {
	console.log("Need a file name as argument");
	return ;
}
require('fs').exists(fileName, function(exists) {
   if (!exists) {
   		console.log("file '" + fileName + "' doesn't exist.");
   } else {
   		createServer(fileName);
   }
});


function createServer(p_file) {
	const server=net.createServer(function(connection) {
		console.log('Subscriber connected!');
		connection.write("Now watching '" + p_file + "' for changes\n");
		let watcher=require('fs').watch(p_file, function() {
			connection.write("File '" + p_file + "' changed at " + Date.now().toString() + "\n");
		});
		connection.on("data", function(data) {
			console.log("There are data received from connection:"  + data.toString());
		});
		connection.on("close", function(){
			console.log("Connection closed!");
			watcher.close();
		});
	});

	server.listen(5432, function() {
		console.log("Server started and listening on port 5432.");	
	});
}
