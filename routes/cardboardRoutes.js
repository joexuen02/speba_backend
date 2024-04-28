import express from 'express';
import { Cardboard } from '../models/cardboardModel.js';

const router = express.Router();

// Route for save a new cardboard
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.imageUrls
        ) {
            return response.status(400).send({
                message: 'All fields are required'
            });
        }
        const newCardboard = {
            imageUrls: request.body.imageUrls,
        };

        const cardboard = await Cardboard.create(newCardboard);

        return response.status(201).send(cardboard);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const cardboards = await Cardboard.find({});
        return response.status(200).json({
            count: cardboards.length,
            data: cardboards
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one cardboard
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const cardboards = await Cardboard.findById(id);
        return response.status(200).json(cardboards);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a cardboard
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
        const result = await Cardboard.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'Cardboard not found' });
        }

        return response.status(200).send({ message: 'Cardboard updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a cardboard
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Cardboard.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Cardboard not found' });
        }

        return response.status(200).send({ message: 'Cardboard deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
