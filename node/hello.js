var http=require("http");

http.createServer(function(request, response){
	response.writeHeader(200, {"Content-Type": "text/html;charset=UTF-8"});
	response.write("<html><body><h1>Hello JS</h1></body></html>");
	response.end();
}).listen(8001);