import express from 'express';
import logger from '../services/LoggerService/logger';
import * as TestService from './../services/TestService/TestService';
import isAuth from '../middlewares/isAuth/isAuth';
import {Request, Response, RequestHandler} from 'express';

import ProjectList, { IProjectList } from '../models/ProjectList.model';
import Task from '../models/Task.model';
//import IProjectList from '../models/ProjectList.model';

const projectListRouter = express.Router();


// Get some info about specific projectList of user.
projectListRouter.get('/get-tasks-from-project-list/:id', isAuth, async (req: Request, res: Response) => {
    try {
        // 1. Get projectList by id.
        const ourId = req.params.id;
        const projectList: IProjectList = await ProjectList.findOne({_id: ourId});

        //logger.info(`1. Inside tasks :\n Our projectList by id : ${JSON.stringify(projectList, null, 4)}`);
        // 2. Check if that user is owner of that projectList.
        const userDecoded = (req as any).userDecoded;
        //logger.info(`2. Decoded user: ${JSON.stringify(userDecoded, null, 4)}`);
        //logger.info(`\n3. projectList.user : ${projectList.user}\n userDecoded._id : ${userDecoded._id}`);                
        if (projectList?.user == userDecoded?._id) {

            // 3. Get all tasks related to current projectList.
            //logger.debug(`Project list id : ${(projectList as any)._id}`);
            
            const our_tasks = await Task.find({projectList_id: (projectList as any)._id});
            //const our_tasks = projectList.tasks; // Invalid solution.
            //logger.debug(`Our tasks : ${JSON.stringify(our_tasks, null, 4)}`);

            res.json({projectList: projectList, tasks: our_tasks}).status(200).end();
        } else {
            throw new Error(`That projectList refers to another user.`)
        }        
    } catch (e) {
        res.json({msg: (e as Error).message}).status(500).end();
    }
});

// Get all by user.
projectListRouter.get('/get-all', isAuth , async (req: Request, res: Response) => {
    try {
        const ourDecodedUser = (req as any).userDecoded;
        const projectLists = await ProjectList.find({user: ourDecodedUser._id});
        res.json({projectLists}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// Create one for user.
projectListRouter.post('/create-one', isAuth, async (req: Request, res: Response) => {    
    try {
        //logger.info(`Inside CREATE ----------------`);
        const ourDecodedUser = (req as any).userDecoded;
        const projListData = req.body.projectList;

        //logger.info(`Our req.body : ${JSON.stringify(req.body, null, 4)}`);

        if (projListData) {

            //logger.info(`Project list data from client : ${JSON.stringify(projListData, null,4)}`);
            const projectList = new ProjectList({
                title: projListData.title,
                tag: projListData.tag,
                user: ourDecodedUser._id,
            });
            const newProjectList = await projectList.save();        

            res.status(201).json(newProjectList);
        } else {
            throw new Error(`projectListData is not correct or missed`);
        }
    } catch (err) {
        // '400' status mens that smth gone wronge because of user input.
        res.status(400).json({ message: (err as Error).message });
    }
});

// Update one.
// p.s. pass all parameters through JSON like : 
// {"projectList": {
//     "title": "new_title",
//     "tag": "new_title_of_tag"   
// }}
projectListRouter.patch('/update-one/:id', isAuth, (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Delete one.
projectListRouter.post('/delete-one/:id', isAuth, async (req: Request, res: Response) => {
    try {
        logger.debug(`Inside delete project ...`);
        const id = req.params.id;        
        const projectList = await ProjectList.deleteOne({_id: id});        
        res.json({}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});

// Delete all.
projectListRouter.delete('/delete-all', isAuth, (req: Request, res: Response) => {
    try {
        const result = {};
        res.json({result}).status(200).end();
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });   
    }
});


export default projectListRouter;