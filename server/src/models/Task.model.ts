import mongoose from 'mongoose';

interface ITask {
    text: string,
    isCompleted: boolean,
    ownTaskList: String,
}

const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },    
    projectList_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectList'
    }
});

const Task = mongoose.model<ITask & mongoose.Document>('Task', TaskSchema);
export default Task;