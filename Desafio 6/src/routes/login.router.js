import { Router } from "express";
import registerModel from "../dao/models/register.model.js";


const loginRouter = Router();


const auth = async (req, res, next) => {
    if (await req.session?.user) {
        return next();
    } else {
        return res.status(401).send("Error de autenticación.");
    }
};

loginRouter.get("/", (req, res) => {
    res.render("login", {});
});

loginRouter.get("/user", async (req, res) => {
    try {
        const { email, password } = req.query;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.user = email;
            req.session.admin = true;
            return res.status(200).send({ message:"success" });
        } else {
            const result = await registerModel.findOne({ email: email, password: password });
            if (result) {
              req.session.user = email;
              req.session.admin = false;
              req.session.rol = "usuario";
              return res.status(200).send({ message:"success" });
            } else {
                res.status(401).send({ message:"error" });
            }   
        }
    } catch (err) {
        res.status(500).send({ err: err });
    }
});

loginRouter.get("/products", auth, async (req,res) => {
    if (await req.session?.user) {
        if (req.session?.admin) {
            const { first_name, last_name } = await registerModel.findOne({ email: req.session.user });
            return res.render("products", { first_name: first_name, lastName: last_name, admin: "Administrador" });
        }
        const { first_name, last_name } = await registerModel.findOne({ email: req.session.user });
        res.render("products",{ first_name, last_name }) ;
    }
});

loginRouter.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (err) {
            res.status(401).send({ message:"Error." });
        } else {
            res.status(200).send({ message:"Sesión finalizada." });
        }
    });
});


export default loginRouter;