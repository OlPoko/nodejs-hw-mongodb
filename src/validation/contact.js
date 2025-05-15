// src/validation/contacts.js

import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  phoneNumber: Joi.string().trim().required(),
  email: Joi.string().trim().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});
