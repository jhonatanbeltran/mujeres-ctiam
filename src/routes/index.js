const { Router } = require("express");
const login = require("./login");
const isAuthenticated = require("../middlewares/isAuthenticated");
const nodeMailer = require("../services/nodemailer");
const router = Router();
const user = require("./user");

router.get("/", (req, res) => {
    res.render("index", {
        title: "Tienda CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contacto | Mujeres CTIAM",
    });
});

router.post("/contact", (req, res) => {
    const { name, numberPhone, email, message } = req.body;
    nodeMailer(name, email, (err) => {
        if (err) console.log(err);
        res.render("contact", {
            status: err ? false : true,
        });
    });
});

router.get("/list", (req, res) => {
    res.render("list", {
        title: "Lista | Mujeres CTIAM",
    });
});

router.get("/questions", (req, res) => {
    res.render("questions", {
        title: "Preguntas frecuentes | Mujeres CTIAM",
    });
});

router.get("/list-product", (req, res) => {
    res.render("list-product", {
        title: "Lista productos | Mujeres CTIAM",
    });
});

router.use("/login", login);

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
});

router.use("/home", user);

module.exports = router;
