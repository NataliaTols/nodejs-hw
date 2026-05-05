import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const noteSchema = new Schema({
    title: {
        trim: true,
        type: String,
        required: true,
    },
    content: {
        trim: true,
        type: String
    },
    tag: {
        type: String,
        enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
        default: "Todo"
    }
}
    , { timestamps: true }
);
export const Notes = mongoose.model('Note', noteSchema);