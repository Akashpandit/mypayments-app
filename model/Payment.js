import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    paymentMode: {
        type: String
    },
    client: {
        type: mongoose.Types.ObjectId,
        ref: "Client",
        required: true
    }
});

export default mongoose.model("Payment", paymentSchema);