import Client from "../model/Client";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    const { name, contact, password, area, description } = req.body;

    let existingClient
    try {
        existingClient = await Client.findOne({ contact });
    } catch (err) {
        return console.log(err);
    }

    if (existingClient) {
        return res
            .status(400)
            .json({
                message: "Client is already added.Login to view."
            })
    }

    const hashPassword = bcrypt.hashSync(password);

    const client = new Client({
        name,
        contact,
        password: hashPassword,
        area,
        description,
        payments: []
    });

    try {
        client.save();
    } catch (err) {
        return console.error(err);
    }

    return res.status(201).json({ client });


}

export const login = async (req, res, next) => {

    const { contact, password } = req.body;
    let existingClient;
    try {
        existingClient = await Client.findOne({ contact });
    } catch (err) {
        return console.log(err);
    }

    if (!existingClient) {
        return res.status(400).json({
            message: "No Client found!"
        });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingClient.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid credential"
        });
    }

    return res.status(200).json({ message: "Login Successful", client: existingClient });
};


export const getAllClients = async (req, res, next) => {

    let clients;
    try {
        clients = await Client.find();
    } catch (err) {
        console.log(err);
    }

    if (!clients) {
        return res.status(404).json({
            message: "No clients found"
        });
    }

    return res.status(200).json({ clients });

}