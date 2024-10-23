import express from 'express'
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import {usersRouter} from "./routers/usersRouter.js"


const app = express()

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use("/", usersRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
