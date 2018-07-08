import express from "express";
import validationController from "../controllers/validation.controller"
const router = express.Router()

router.post('/validate', (req, res) => {
    validationController.validate(req, res);
});

export default router;