import express from "express"
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from "./routes/authRoute.js"
import postRouter from "./routes/postRoute.js"
import userRouter from "./routes/userRoute.js"
import storyRouter from "./routes/storyRoute.js"
import commentRouter from "./routes/commentRoute.js"
import cors from 'cors'
import cookieParser from "cookie-parser";
import WebSocket, { WebSocketServer } from 'ws';
import chatRouter from './routes/chatRouter.js'
import messageRouter from './routes/messageRouter.js'
import jwt from "jsonwebtoken"

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
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/stories', storyRouter);
app.use('/api/comments', commentRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

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

const server = app.listen(3000,() => {
    console.log("App started at port 3000");
})

const wss = new WebSocketServer({ server });

wss.on('connection', (connection, request) => { //When client will make connection to the server
    try {
        // console.log("Connection established");
        // console.log(wss.clients.size);

        // connection.send('connection recieved');


        // function notifyAboutOnlinePeople() {
        //     [...wss.clients].forEach((client => {
        //         client.send(JSON.stringify(
        //             {
        //                 online: [...wss.clients].map((c) => ({ userId: c.userId }))
        //             }
        //         ))
        //     }))
        // }

        let cookies = request.headers.cookie;
        // console.log(cookies);
        if (cookies) {
            const tokenCookieString1 = cookies.split(';').find((str) => str.startsWith(' token='))
            const tokenCookieString2 = cookies.split(';').find((str) => str.startsWith('token='))
            // console.log(tokenCookieString);
            if (tokenCookieString1 || tokenCookieString2) {
                if (tokenCookieString1) {
                    const token = tokenCookieString1.split('=')[1]
                    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
                        if (err) throw err;
                        // console.log(userData);
                        connection.userId = userData.userId;
                    })
                } else {
                    const token = tokenCookieString2.split('=')[1]
                    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
                        if (err) throw err;
                        // console.log(userData);
                        connection.userId = userData.userId;
                    })
                }


            }
        };
        // console.log(connection.userId);

        // notifyAboutOnlinePeople()

        connection.on('message', ((data) => {
            let message= (JSON.parse(data));
            // console.log("New message recieved :  ", message);
            [...wss.clients]
                .filter(c => c.userId == message.reciever)
                .forEach(c => c.send(JSON.stringify(message)))
        })
        )

    } catch (error) {
        console.log(error);
    }

})