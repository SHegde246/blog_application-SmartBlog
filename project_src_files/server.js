
const http=require("http");

//need to use the exress app as a listener in this server 
//have to import the express app here
const app=require("./backend/app");


app.set("port",3000);

//make express app the listener
const server=http.createServer(app); 

server.listen(3000);  


//*******************************************

