import { Router } from 'express';
import { register, login } from '../controllers/UserAuth';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/Task';
import authMiddleware from '../middleware/auth';
import { Response, Request } from 'express';

const router = Router();


router.post("/register", register);
router.post("/login", login);

router.post("/create-task", authMiddleware, createTask);
router.get("/all-tasks", authMiddleware, getTasks);
router.put("/update-task/:id", authMiddleware, updateTask);
router.delete("/delete-task/:id", authMiddleware, deleteTask);


export interface domi extends Request {
    user?: any;
}

// authentication
router.get("/auth", authMiddleware, (req: domi, res: Response) => {
    return res.status(200).json({ isauthenticated: true });
})


export default router;