//add methods to be performed on payemnts
//1. Get the payment info
//2. Update the payment info
//3. Delete the payment

import mongoose from "mongoose";
import Payment from "../model/Payment";
import Client from "../model/Client"

export const addPayment = async (req, res, next) => {
    const { amount, date, description, paymentMode, client } = req.body;

    let existingClient;
    try {
        existingClient = await Client.findById(client);
    } catch (err) {
        return console.log(err)
    }
    if (!existingClient) {
        return res.status(400).json({
            message: "Client not found"
        });
    }

    const payment = new Payment({
        amount,
        date,
        description,
        paymentMode,
        client
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await payment.save({ session });
        existingClient.payments.push(payment);
        await existingClient.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }

    return res.status(200).json({ payment });

}

export const getAllPayments = async (req, res, next) => {
    let payments;
    try {
        payments = await Payment.find().populate("client");
    } catch (err) {
        return console.log(err);
    }

    if (!payments) {
        return res.status(404).json({ message: "No payments found" });
    }

    return res.status(200).json({ payments });
}


//Editing payment

export const editPayment = async (req, res, next) => {
    const { amount, date, paymentMode, description } = req.body;

    const payId = req.params.id; //getting the payment id from url
    let payment;
    try {
        payment = await Payment.findByIdAndUpdate(payId, { amount, date, paymentMode, description });
    } catch (err) {
        return console.log(err)
    }
    if (!payment) {
        return res.status(500).json({ message: "Failed to update" });
    }

    return res.status(200).json({ payment });

}

export const getPaymentById = async (req, res, next) => {

    const paymentId = req.params.id;
    let payment;

    try {
        payment = await Payment.findById(paymentId);
    } catch (err) {
        return console.log(err);
    }
    if (!payment) {
        return res.status(400).json({
            message: "No Payments found"
        });
    }
    res.status(200).json({ payment });
}



export const deletePaymentById = async (req, res, next) => {
    const payId = req.params.id;
    let payment;
    try {
        payment = await Payment.findByIdAndRemove(payId);
    } catch (err) {
        console.log(err);
    }

    if (!payment) {
        return res.status(500).json({ message: "Failed to delete the payment" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });

}

export const clientPayments = async (req, res, next) => {

    const clientId = req.params.id;

    let clientPayments;

    try {
        clientPayments = await Client.findById(clientId).populate("payments");
    } catch (err) {
        return console.log(err);
    }

    if (!clientPayments) {
        return res.status(404).json({ message: "No Payments Found" });
    }

    return res.status(200).json({ client: clientPayments });
}