import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { error } from 'console';
import router from './routes/route';
import cookieParser from 'cookie-parser';


// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import authRoutes from './routes/authRoutes';
// import taskRoutes from './routes/taskRoutes';
// import { setupSocket } from './utils/socket';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// const server = createServer(app);
// const io = new Server(server);

app.use(cors({
    origin: 'https://lcv-real-time-96hk.vercel.app',
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());





// setupSocket(io);

app.use("/api", router);


mongoose.connect(process.env.MONGO_URL || ' ').then(() => {
    console.log("database is connected... ")
}).catch(() => {
    console.log("error in database conecting..", error);
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
});


