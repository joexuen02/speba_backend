import express from 'express';
import { Glass } from '../models/glassModel.js';

const router = express.Router();

// Route for save a new glass
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.imageUrls
        ) {
            return response.status(400).send({
                message: 'All fields are required'
            });
        }
        const newGlass = {
            imageUrls: request.body.imageUrls,
        };

        const glass = await Glass.create(newGlass);

        return response.status(201).send(glass);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const glasses = await Glass.find({});
        return response.status(200).json({
            count: glasses.length,
            data: glasses
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one glass
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const glasses = await Glass.findById(id);
        return response.status(200).json(glasses);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a glass
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
        const result = await Glass.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'Glass not found' });
        }

        return response.status(200).send({ message: 'Glass updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a glass
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Glass.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Glass not found' });
        }

        return response.status(200).send({ message: 'Glass deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
