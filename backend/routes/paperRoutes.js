import express from 'express';
import { Paper } from '../models/paperModel.js';

const router = express.Router();

// Route for save a new paper
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.imageUrls
        ) {
            return response.status(400).send({
                message: 'All fields are required'
            });
        }
        const newPaper = {
            imageUrls: request.body.imageUrls,
        };

        const paper = await Paper.create(newPaper);

        return response.status(201).send(paper);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const papers = await Paper.find({});
        return response.status(200).json({
            count: papers.length,
            data: papers
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one paper
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const papers = await Paper.findById(id);
        return response.status(200).json(papers);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a paper
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
        const result = await Paper.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'Paper not found' });
        }

        return response.status(200).send({ message: 'Paper updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a paper
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Paper.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Paper not found' });
        }

        return response.status(200).send({ message: 'Paper deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
