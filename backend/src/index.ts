import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { createServer } from "http";
import cors from "cors";
import express from "express";
import { GameRoom } from "./GameRoom";
import basicAuth from "express-basic-auth";

const port = Number(process.env.port) || 5000;

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development")
  app.use(cors({
    origin: '*',
    methods: 'POST, GET, OPTIONS',
    allowedHeaders: 'Content-Type'
  }))

const gameServer = new Server({
  server: createServer(app)
});

gameServer.define('game', GameRoom)

const basicAuthMiddleware = basicAuth({
  // list of users and passwords
  users: {
    "admin": process.env.ADMIN_PASS,
  },
  // sends WWW-Authenticate header, which will prompt the user to fill
  // credentials in
  challenge: true
});
app.use("/colyseus", basicAuthMiddleware, monitor());

gameServer.listen(port);