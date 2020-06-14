const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DepartamentSchema = new Schema({
    dept_name: {
        type: String,
        required: true
    }
});

const Departament = mongoose.model('Departament', DepartamentSchema);

if (!Departament.collection.collection) {
    Departament.createCollection();
}

module.exports = { Departament, DepartamentSchema };
