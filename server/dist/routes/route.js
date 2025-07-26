"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAuth_1 = require("../controllers/UserAuth");
const Task_1 = require("../controllers/Task");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/register", UserAuth_1.register);
router.post("/login", UserAuth_1.login);
router.post("/create-task", auth_1.default, Task_1.createTask);
router.get("/all-tasks", auth_1.default, Task_1.getTasks);
router.put("/update-task/:id", auth_1.default, Task_1.updateTask);
router.delete("/delete-task/:id", auth_1.default, Task_1.deleteTask);
// authentication
router.get("/auth", auth_1.default, (req, res) => {
    return res.status(200).json({ isauthenticated: true });
});
exports.default = router;
