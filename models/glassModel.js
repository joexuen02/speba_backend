import mongoose from 'mongoose';

const glassSchema = mongoose.Schema(
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

export const glass = mongoose.model('glass', glassSchema);