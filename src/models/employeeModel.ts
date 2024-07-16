import mongoose from "mongoose";

const EmployeeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    admission_date: {
        type: Date,
        required: true
    },
});

export default mongoose.model('Employee', EmployeeModel);