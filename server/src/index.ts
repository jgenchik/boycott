// import * as dotenv from "dotenv";
import express, {Application, Request, Response, NextFunction} from "express";

import cors from "cors";
import { UpcItemDbRouter } from "./routers/upcitemdb.router";
// import helmet from "helmet";
// dotenv.config();

const PORT = 7003;
 
const app: Application = express();


// app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/upcitemdb", UpcItemDbRouter);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
