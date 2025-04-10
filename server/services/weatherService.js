import axios from "axios";

export const fetchWeatherFromAMap = async (city) => {
  const key = process.env.AMAP_KEY;
  const url = "https://restapi.amap.com/v3/weather/weatherInfo";

  const response = await axios.get(url, {
    params: {
      key,
      city,
      extensions: "all",
      output: "JSON",
    },
  });

  return response.data;
};
