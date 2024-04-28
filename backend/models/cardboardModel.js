import mongoose from 'mongoose';

const cardboardSchema = mongoose.Schema(
    {
        imageUrls: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Cardboard = mongoose.model('Cardboard', cardboardSchema);