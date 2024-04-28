import mongoose from 'mongoose';

const trashSchema = mongoose.Schema(
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

export const trash = mongoose.model('trash', trashSchema);