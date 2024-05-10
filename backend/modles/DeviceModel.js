import mongoose from 'mongoose'
const DevicesSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ['Web','Android','iOS'],
        required:true,
    },
    status: {
        type: String,
        enum: ['Active', 'Deactive'],
        required: true,
        default:'Active'
    },
   
},{
    timestamps: true
})

const Device=mongoose.model('Device',DevicesSchema)
export default Device