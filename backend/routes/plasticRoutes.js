import express from 'express';
import { Plastic } from '../models/plasticModel.js';

const router = express.Router();

// Route for save a new plastic
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.imageUrls
        ) {
            return response.status(400).send({
                message: 'All fields are required'
            });
        }
        const newPlastic = {
            imageUrls: request.body.imageUrls,
        };

        const plastic = await Plastic.create(newPlastic);

        return response.status(201).send(plastic);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const plastics = await Plastic.find({});
        return response.status(200).json({
            count: plastics.length,
            data: plastics
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one plastic
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const plastics = await Plastic.findById(id);
        return response.status(200).json(plastics);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a plastic
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
        const result = await Plastic.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'Plastic not found' });
        }

        return response.status(200).send({ message: 'Plastic updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a plastic
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Plastic.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Plastic not found' });
        }

        return response.status(200).send({ message: 'Plastic deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
