var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Screen({
    'name': String,
    'department': String,
    'price': Number,
});

module.exports = mongoose.model('Product', ProductSchema);