const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToMongo = require("./db");
const app = express();
connectToMongo();
const appPort = process.env.PORT || 2000;


const server = app.listen(appPort, () => {
    console.log(`backend server is up on ${appPort}`)
})

//unexpected error handling
process.on("uncaughtException", (err) => {
  console.log(`Logged Error from index js: ${err.stack}`);
  server.close(() => process.exit(1));
})




//with use of this our appliction will be abel to accept json inputs
app.use(express.json({limit : 52428800})); //this is 50mb in bytes

app.get('/' , async (req, res) => {   
    res.send("HELLO WORLD")
  })



  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/products", require("./routes/product"));


