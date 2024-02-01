import mongoose from "mongoose";
import express from "express";
import apiRegister from "./api-register.js";

const server = express();
server.use(express.json());

const port = 3000;

mongoose.connect(
  "mongodb+srv://ericpudney:Sonnet130@cluster0.jidr2xq.mongodb.net/Bokhandel"
);

apiRegister(server, mongoose);

server.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
