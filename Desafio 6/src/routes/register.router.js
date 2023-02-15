import { Router } from "express";
import registerModel from "../dao/models/register.model.js";


const registerRouter = Router();


registerRouter.get("/", (req, res) => {
    res.render("register", {});
});

registerRouter.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const payload = await registerModel.create({ first_name, last_name, email, age, password });
        res.status(200).send({ message: "success", payload: payload });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default registerRouter;