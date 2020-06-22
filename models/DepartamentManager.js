const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DepartamentManagerSchema = new Schema({
    from_date: {
        type: Date
    },
    to_date: {
        type: Date
    },
    departamentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const DepartamentManager = mongoose.model('DepartamentManager', DepartamentManagerSchema);

if (!DepartamentManager.collection.collection) {
    DepartamentManager.createCollection();
}

module.exports = { DepartamentManager, DepartamentManagerSchema };
