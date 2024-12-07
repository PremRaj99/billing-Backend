const mongoose = require("mongoose");

const receivePaymentSchema = new mongoose.Schema(
  {
    estimateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estimate",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
  },
  { timeStamps: true }
);

const ReceivePayment = mongoose.model("ReceivePayment", receivePaymentSchema);

module.exports = ReceivePayment;
