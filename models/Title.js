const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TitleSchema = new Schema({
    title: {
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

const Title = mongoose.model('Title', TitleSchema);

if (!Title.collection.collection) {
    Title.createCollection();
}

module.exports = { Title, TitleSchema };
