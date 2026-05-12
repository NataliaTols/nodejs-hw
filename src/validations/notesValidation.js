import { Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';
import {TAGS} from "../constants/tags.js";

const isValidId = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.message('Not valid ObjectId');
  }

  return value;
};

export const getAllNotesSchema = {
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().integer().min(1).default(1), 
        perPage: Joi.number().integer().min(1).max(100).default(10),
        tag: Joi.string().valid(...TAGS),
        search: Joi.string().allow(''),
    }),

};
// GET /notes/:noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    noteId: Joi.string().custom(isValidId).required(),
  }),
};

// POST /notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(1).required(),

    content: Joi.string().allow(''),

    tag: Joi.string().valid(...TAGS),
  }),
};

// PATCH /notes/:noteId
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    noteId: Joi.string().custom(isValidId).required(),
  }),

  [Segments.BODY]: Joi.object()
    .keys({
      title: Joi.string().min(1),

      content: Joi.string().allow(''),

      tag: Joi.string().valid(...TAGS),
    })
    .min(1),
};