//-----------------------------------------------------
// Title: Server 
// Author: Tunç Gürsoy
// ID: 64528127274
// Section: 1
// Homework: 1
// Description: Main and Server class of the this application 
//-----------------------------------------------------
const http = require('http');
const app = require('./app')
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port,()=>
{
    console.log("Server listening on: http://localhost:%s", port);
});