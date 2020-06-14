const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    salary: {
        type: Number,
        required: true
    },
    from_date: {
        type: Date
    },
    to_date: {
        type: Date
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Salary = mongoose.model('Salary', SalarySchema);

if (!Salary.collection.collection) {
    Salary.createCollection();
}

module.exports = { Salary, SalarySchema };
