import express from 'express';
import { Metal } from '../models/metalModel.js';

const router = express.Router();

// Route for save a new metal
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.imageUrls
        ) {
            return response.status(400).send({
                message: 'All fields are required'
            });
        }
        const newMetal = {
            imageUrls: request.body.imageUrls,
        };

        const metal = await Metal.create(newMetal);

        return response.status(201).send(metal);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const metals = await Metal.find({});
        return response.status(200).json({
            count: metals.length,
            data: metals
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one metal
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const metals = await Metal.findById(id);
        return response.status(200).json(metals);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a metal
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
        const result = await Metal.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'Metal not found' });
        }

        return response.status(200).send({ message: 'Metal updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a metal
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Metal.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Metal not found' });
        }

        return response.status(200).send({ message: 'Metal deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
