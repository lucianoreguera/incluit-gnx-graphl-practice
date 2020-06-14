module.exports = function(schema, options) {
    schema.add({updatedAt: {type: Date}});
    schema.add({createdAt: {type: Date}});
    schema.set('timestamps', true);
};
  