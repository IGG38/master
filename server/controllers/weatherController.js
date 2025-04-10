import { fetchWeatherFromAMap } from "../services/weatherService.js"; // 注意加 `.js`

export const getWeather = async (req, res) => {
  try {
    const city = req.query.city || "330100";
    const result = await fetchWeatherFromAMap(city);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "服务异常" });
  }
};
