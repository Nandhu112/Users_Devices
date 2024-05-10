import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]+$/,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },

    Devices: {
        type: Array,
        // default: "default.png",
    },
    status: {
        type: String,
        enum: ['Active', 'Deactive'],
        default: "Active",
        required: true
    },
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {

        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User