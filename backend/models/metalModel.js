import mongoose from 'mongoose';

const metalSchema = mongoose.Schema(
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

export const metal = mongoose.model('metal', metalSchema);