const server = require("./app");

server.listen(3000, async function () {
  let data = new Date() 
  console.log("API Monstrobet em funcionamento ! " + data.toLocaleString() );
});
