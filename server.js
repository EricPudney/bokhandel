import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import apiRegister from "./api-register.js";

const server = express();
server.use(express.json());
server.use(express.static("./"));

server.use(
  session({
    secret: "ditt_hemliga_tangent", // en hemlig nyckel för att signera session-cookie
    resave: false, // undviker att spara sessionen om den inte ändras
    saveUninitialized: true, // spara en ny session som inte har blivit initialiserad
    cookie: { secure: false }, // cookie-inställningar, secure bör vara true i produktion med HTTPS
  })
);

const port = 3000;

mongoose.connect(
  "mongodb+srv://*****@cluster0.jidr2xq.mongodb.net/Bokhandel"
);

apiRegister(server);

server.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
