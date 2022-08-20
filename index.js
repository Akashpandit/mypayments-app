//Importing packages

import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import path from 'path';

import paymentRoute from "./routes/payment-routes";
import clientRoute from "./routes/client-routes"

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use("/api/payment", paymentRoute);
app.use("/api/client", clientRoute);


mongoose.connect(process.env.MONGO_CONNECTION_URL)
    .then(() => app.listen(PORT))
    .then(() => console.log("Connected to database and listening on port :" + PORT))
    .catch((err) => console.error(err));