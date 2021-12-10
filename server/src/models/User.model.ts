import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    email: string,
    name: string
    password: string,
    salt: string,
    role: string,
}

export enum userRole {
    common = 'commonUser',
    moderator = 'moderatorUser',
    admin = 'adminUser',
}

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
      
    password: {
        type: String,
        required: true,
    },

    salt: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        minlength: 1,
        required: true,
    },

    role: {
        type: String,
        default: userRole.common, // Possible values: 'commonUuser' | 'adminUser'. 
    },

    projectLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectList'
    }]
});


const User = mongoose.model<IUser & mongoose.Document>('User', UserSchema);
export default User;