import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    area: {
        type: String
    },
    description: {
        type: String
    },
    payments: [{ type: mongoose.Types.ObjectId, ref: "Payment" }]
});

export default mongoose.model("Client", clientSchema);