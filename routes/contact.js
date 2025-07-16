import express from 'express';

import {newContact,  deleteContactById, getAllContact } from '../controllers/contact.js'

const router = express.Router();

router.post('/new' , newContact);

router.post('/' , getAllContact)

router.delete('/:',deleteContactById)
export default router;

