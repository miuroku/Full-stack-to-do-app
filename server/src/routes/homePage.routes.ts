import express from "express";
import { now } from "mongoose";


const router = express.Router();

function niceDateFormat(nowDate: Date) {
    return `[${nowDate.getDay()}.${nowDate.getMonth()}.${nowDate.getFullYear()}]-[${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}]`;
}

// Middleware.
router.use(function timeLog(req, res, next) {
    const nowDate = new Date();
    console.log(`+ HomePage time access : ${niceDateFormat(nowDate)} `);
    next();
});

router.get('/', function (req, res) {
    res.send('Our homepage .');
});

router.get('/about', function (req, res) {
    res.send('Our about page ...');
});

export default router;