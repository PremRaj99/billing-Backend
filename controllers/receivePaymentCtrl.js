const estimateModel = require("../models/estimateModel");
const ReceivePayment = require("../models/receivePaymentModel");

const addReceivePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentMethod, paymentDate } = req.body;

    const estimate = await estimateModel.findById(id);

    if (amount > estimate.balancePayment) {
      return res
        .status(201)
        .send({ message: "Enter Payable Amount", success: false });
    }

    const payment = await ReceivePayment.create({
      estimateId: id,
      paymentAmount: amount,
      paymentMethod,
      paymentDate,
    });

    estimate.advancePayment =
      parseInt(estimate.advancePayment) + parseInt(amount);
    estimate.balancePayment -= amount;

    await estimate.save();
    res.status(201).send({
      message: "Payment received successfully",
      totalValue: estimate.totalValue,
      advancePayment: estimate.advancePayment,
      balancePayment: estimate.balancePayment,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Error creating payment", success: false });
  }
};

const getReceivePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await ReceivePayment.find({ estimateId: id });
    res.status(200).send({ success: true, data: payment });
  } catch {
    res.status(404).send({ message: "Payment not found", success: false });
  }
};

const deleteReceivePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await ReceivePayment.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "Payment deleted successfully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Error deleting payment", success: false });
  }
};

module.exports = {
  addReceivePayment,
  getReceivePayment,
  deleteReceivePayment,
};
