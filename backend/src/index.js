import express from "express";
import cors from "cors";
import 'dotenv/config'
import routes from "./routes/index.js";
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
routes(app);


app.listen(3333, () => console.log("servidor iniciou na porta 3333"));