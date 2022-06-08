require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { fakeDB } = require("./fakeDB");
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exist
        const user = fakeDB.find(user => user.email === email);
        if (user) throw new Error("User already exists");
        const hashedPassword = await hash(password, 10);
        fakeDB.push({
            id: fakeDB.length,
            email: email,
            password: hashedPassword
        })
        console.log(fakeDB);
        res.send({ message: "User created" });
    } catch (error) {
        res.send({
            error: `${error.message}`
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})