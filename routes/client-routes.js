import express from 'express';

const router = express.Router();
import { signup, login, getAllClients } from '../controllers/client-controller';

router.post("/signup", signup);
router.post("/login", login);
router.get("/getclients", getAllClients);

export default router;