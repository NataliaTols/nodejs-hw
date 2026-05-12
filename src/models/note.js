import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema({
    title: {
        trim: true,
        type: String,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        default: '',
    },
    tag: {
        type: String,
        enum: TAGS,
        default: "Todo"
    }
}
    , { timestamps: true }
);

noteSchema.index({
    title: 'text',
    content: 'text',
});
noteSchema.index({ tag: 1 });

export const Note = mongoose.model('Note', noteSchema);