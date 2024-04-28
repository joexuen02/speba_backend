import mongoose from 'mongoose';

const plasticSchema = mongoose.Schema(
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

export const plastic = mongoose.model('plastic', plasticSchema);