const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// userId: user.userId,
// userName: user.userName,
// userEmail: user.userEmail,
// deliveryInformation: name,street,city:,postalCode
// orderedItems: user.cartContext.items,

// success are start
const orderSchema = new Schema(
  {
    delivery: [
      {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, require: true },
      },
    ],
    order: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        amount: { type: Number, require: true },
        price: { type: Number, require: true },
      },
    ],
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
// success are end

module.exports = mongoose.model("Order", orderSchema);
