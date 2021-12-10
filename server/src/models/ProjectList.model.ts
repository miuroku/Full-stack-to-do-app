import mongoose from 'mongoose';

// Owner is user, his 'Id'.
export interface IProjectList {
    title: string,
    tag: string,
    createdAt: any,
    user: any,
    tasks: [any]
}

const ProjectListSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: "default_title",
    },
    tag: {
        type: String,
        required: false,
        default: "Common"
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'User'
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

const ProjectList = mongoose.model<IProjectList & mongoose.Document>('ProjectList', ProjectListSchema);
export default ProjectList;