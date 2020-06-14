const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DepartamentEmployeeSchema = new Schema({
    from_date: {
        type: Date
    },
    to_date: {
        type: Date
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    departamentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const DepartamentEmployee = mongoose.model('DepartamentEmployee', DepartamentEmployeeSchema);

if (!DepartamentEmployee.collection.collection) {
    DepartamentEmployee.createCollection();
}

module.exports = { DepartamentEmployee, DepartamentEmployeeSchema };
