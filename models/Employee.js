const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    dni: {
        type: String,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date
    },
    gender: {
        type: String,
        required: true
    },
    hire_date: {
        type: Date
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

if (!Employee.collection.collection) {
    Employee.createCollection();
}

module.exports = { Employee, EmployeeSchema };
