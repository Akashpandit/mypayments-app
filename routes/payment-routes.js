import express from 'express';

const router = express.Router();

import { addPayment, getAllPayments, editPayment, deletePaymentById, getPaymentById, clientPayments } from '../controllers/payment-controller';

router.post("/addPayment", addPayment);
router.get("/getpayments", getAllPayments);
router.put("/edit/:id", editPayment);
router.delete("/delete/:id", deletePaymentById);
router.get("/:id", getPaymentById);
router.get("/client/:id", clientPayments);


export default router;