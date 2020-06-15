import { Schema, model } from 'mongoose';

const TascaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    photo: {
        type: String
    }
});

export default model('Tasca', TascaSchema);