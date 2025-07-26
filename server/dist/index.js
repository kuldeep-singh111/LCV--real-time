"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const console_1 = require("console");
const route_1 = __importDefault(require("./routes/route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import authRoutes from './routes/authRoutes';
// import taskRoutes from './routes/taskRoutes';
// import { setupSocket } from './utils/socket';
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// const server = createServer(app);
// const io = new Server(server);
app.use((0, cors_1.default)({
    origin: 'https://lcv-real-time-96hk.vercel.app',
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// setupSocket(io);
app.use("/api", route_1.default);
mongoose_1.default.connect(process.env.MONGO_URL || ' ').then(() => {
    console.log("database is connected... ");
}).catch(() => {
    console.log("error in database conecting..", console_1.error);
});
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`);
});
