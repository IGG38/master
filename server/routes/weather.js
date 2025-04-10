import express from "express";
import { getWeather } from "../controllers/weatherController.js"; // 加 `.js` 扩展名

const router = express.Router();

router.get("/", getWeather);

export default router;
