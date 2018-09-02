var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the order Schema
var orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    total: { type: Number, required: [true, 'Total  is required'] },
    description: { type: String, required: false },
    status: { type: Number, required: true, default: 1 }, // 1: in process, 2: Reject, 3: Cancel, 4: Complete
    date: { type: Date, default: Date.now },
    items: [
        {
            name: { type: String, required: [true, 'Name is required'] },
            price: { type: Number, required: [true, 'Price  is required'] },
            qty: { type: Number, required: [true, 'Quantity  is required'] },
            product: { type: Schema.Types.ObjectId, required: [true, 'Product id is required'] }
        }
    ]
});


module.exports = mongoose.model('Order', orderSchema);
