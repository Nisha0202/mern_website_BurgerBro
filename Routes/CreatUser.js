const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisNishamynameisnishamynameisnisha";

router.post("/creatuser",
    [
        body('name', 'Invalid name').isLength({ min: 3 }),
        body('email', 'Invalid email').isEmail(),
        body('password', 'minimum password length is 5').isLength({ min: 5 })],


    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(6);
        let secpassWord = await bcrypt.hash(req.body.password, salt) //hashed password


        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secpassWord

            })
            res.json({ success: true });
        

        }
        catch (error) {
            console.log(error)
            res.json({ success: false });
        }

    });


// router.post("/loginuser", [
//     body('email', 'Invalid email').isEmail(),
//     body('password', 'minimum password length is 5').isLength({ min: 5 })
// ], async (req, res) => {
//     let email = req.body.email;
//     let pass = req.body.password;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         let userData = await User.findOne({ email });
//         if (!userData) {
//             return res.status(400).json({ errors: "Try with correct email" });
//         }

//         const pwdCompare = await bcrypt.compare(pass, userData.password)
//         if (!pwdCompare) {
//             return res.status(400).json({ errors: "Try with correct password" });
//         }
//         else{
//         const data = {
//             user: {
//                 id: userData.id
//             }
//         }
//         const authToken = jwt.sign(data, jwtSecret)
//         return res.json({ success: true, authToken: authToken }); }



//     } catch (error) {
//         console.log(error);
//         res.json({ success: false });
//     }
// });

router.post("/loginuser", [
    body('email', 'Invalid email').isEmail(),
    body('password', 'minimum password length is 5').isLength({ min: 5 })
], async (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (email === 'admin@gmail.com' && pass === '45456') {
            // generate a different authToken for the admin user
            const data = {
                user: {
                    id: 'admin'
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken });
        } else {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try with correct email" });
            }

            const pwdCompare = await bcrypt.compare(pass, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try with correct password" });
            }
            else{
                const data = {
                    user: {
                        id: userData.id
                    }
                }
                const authToken = jwt.sign(data, jwtSecret)
                return res.json({ success: true, authToken: authToken }); 
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});










module.exports = router;