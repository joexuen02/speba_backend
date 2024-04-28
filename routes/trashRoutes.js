import express from 'express';
import { Trash } from '../models/trashModel.js';

const router = express.Router();

// Route for save a new trash
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.imageUrls
        ) {
            return response.status(400).send({
                message: 'All fields are required'
            });
        }
        const newTrash = {
            imageUrls: request.body.imageUrls,
        };

        const trash = await Trash.create(newTrash);

        return response.status(201).send(trash);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const trash = await Trash.find({});
        return response.status(200).json({
            count: trash.length,
            data: trash
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one trash
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const trash = await Trash.findById(id);
        return response.status(200).json(trash);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a trash
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.imageUrls
        ) {
            return response.status(400).send({
                message: 'All fields are required'
            });
        }

        const { id } = request.params;
        const result = await Trash.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'Trash not found' });
        }

        return response.status(200).send({ message: 'Trash updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a trash
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Trash.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Trash not found' });
        }

        return response.status(200).send({ message: 'Trash deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
