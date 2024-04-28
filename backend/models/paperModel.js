import mongoose from 'mongoose';

const paperSchema = mongoose.Schema(
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

export const Paper = mongoose.model('Paper', paperSchema);