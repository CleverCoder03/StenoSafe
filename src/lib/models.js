import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    img: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const EncryptedDataSchema = new mongoose.Schema({
    title: {
        type: String
    },
    img: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})


export const user = mongoose.models.User || mongoose.model('User', userSchema)

export const EncryptedData = mongoose.models.EncryptedData || mongoose.model('EncryptedData', EncryptedDataSchema)