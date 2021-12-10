import express from 'express';
import isAuth from '../middlewares/isAuth/isAuth';
import {Request, Response, RequestHandler} from 'express';
import ProjectList from '../models/ProjectList.model';
import Task from '../models/Task.model';
import checkRole from '../middlewares/checkRole';
import { userRole } from '../models/User.model';

const taskRouter = express.Router();


// Create One.
// p.s. pass all parameters through JSON:
// {"task": {
//      "title": "some_new_title", 
// }}
taskRouter.post('/create-one/:id', isAuth, async (req: Request, res: Response) => {
    try {
        const ourDecodedUser = (req as any).userDecoded;
        const taskData = req.body.task;
        const projectListId = req.params.id;
        let result = {};

        if (taskData) {

            const task = new Task({
                title: taskData.title,
                projectList_id: projectListId         
            });
            const newTask = await task.save();
            result = {task: newTask};

        } else {
            throw new Error(`Task data isn't correct or missed`);
        }
        
        res.json(result).status(201).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Get One.
taskRouter.get('/get-one/:id', isAuth, (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Delete one.
taskRouter.get('/delete-one/:id', isAuth, (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Update one.
// p.s. pass all parameters through JSON like : 
// {"task": { 
//      "title": "new_title",
//       "completed": true }}
taskRouter.get('/update-one/:id', isAuth, (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Get all.
taskRouter.get('/get-all', isAuth, checkRole(userRole.admin), (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Delete one.
taskRouter.get('/delete-one/:id', isAuth, (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Delete all.
taskRouter.get('/delete-all/:projectListId', isAuth, (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});


export default taskRouter;