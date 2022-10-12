import express from "express";
import Auth from "./Middlewares/authorization"
import session from 'express-session';
import redisClient from "./Connections/redis.connection";
import cors, { CorsOptions } from 'cors'
import { sessionConfig } from "./Config/session.config";
import { PubSub } from "graphql-subscriptions";
import multer from 'multer'
import fs from 'fs'

const RedisStore = require("connect-redis")(session);

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

export const pubsub = new PubSub();

// add middleware to  the express object.
app.use(express.json());

// add middlewares to  the express object.
const corsOptions: CorsOptions = {
  //To allow requests from client
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000'
  ],
  allowedHeaders: ["Access-Control-Allow-Origin", "set-cookie", "X-Requested-With", "content-type", "Access-Control-Allow-Credentials", "cookie", "Cookie", "Set-Cookie", "crossDomain"],
  credentials: true,
  exposedHeaders: ["set-cookie", "cookie", "Set-Cookie", "Access-Control-Allow-Credentials", "New-header"],
  maxAge: sessionConfig.sessionExpireTime
}
app.use(cors(corsOptions))

app.use(
  session({
    name: `${sessionConfig.sessionName}:`,
    store: new RedisStore({ client: redisClient, prefix: `${sessionConfig.sessionPrefix}:` }),
    saveUninitialized: false,
    secret: `${sessionConfig.sessionSecret}`,
    resave: false,
    cookie: { maxAge: sessionConfig.sessionExpireTime, httpOnly: false },
  })
);

app.use(Auth)

const storage = multer({ dest: __dirname + "/store" })

app.get('/file/:id', (req, res) => {
  const file = __dirname + "/store/" + req.params.id
  res.sendFile(file)
})

app.post('/upload', storage.any(), async (req, res) => {
  const imagesName: string[] = [];
  const payload = req.files as any[]
  const host = "http://localhost"
  for (let i = 0; i < payload.length; ++i) {
    let fileName = `${Date.now()}____${payload[i].originalname.replace(/\ /g, "-")}`
    fs.renameSync(`dist/store/${payload[i].filename}`, `dist/store/${fileName}`)
    imagesName.push(`${host}:${process.env.PORT}/file/${fileName}`)
  }
  res.json({ success: "Success", uri: imagesName })
})

export default app;
