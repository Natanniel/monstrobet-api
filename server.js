const server = require("./app");

server.listen(3000, async function () {
  let data = new Date()
 
  console.log("Servidor RZBlaz em funcionamento ! " + data.toLocaleString() );
});
