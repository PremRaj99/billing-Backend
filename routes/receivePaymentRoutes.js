const express = require("express")
const { addReceivePayment, getReceivePayment, deleteReceivePayment } = require("../controllers/receivePaymentCtrl")

const router = express.Router()

router.post("/:id", addReceivePayment)
router.get("/:id", getReceivePayment)
router.delete("/:id", deleteReceivePayment)

module.exports = router;