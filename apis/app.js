import express from "express"
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from "./routes/authRoute.js"
import cors from 'cors'
import cookieParser from "cookie-parser";

app.use(cookieParser())
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

main()
.then(() => console.log("DB connected"))
.catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/rivalre');
}
app.use(cors({
  origin : process.env.CLIENT_URL,
  credentials : true
}))

app.use('/api/auth', authRouter);

app.use((err,req,res,next) => {
  console.log( "Error is : ", err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong..."

  res.status(status).json({
    status,
    message,
    error : true
  })
})

app.listen(3000,() => {
    console.log("App started at port 3000");
})