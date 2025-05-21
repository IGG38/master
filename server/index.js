// index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3001;

// 跨域允许所有来源访问
app.use(cors());

// 获取微博用户信息接口
app.get("/api/weibo-info", async (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    return res.status(400).json({ error: "缺少 uid 参数" });
  }

  try {
    const response = await axios.get(
      `https://weibo.com/ajax/profile/info?uid=${uid}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Referer: `https://weibo.com/u/${uid}`,
          // ✅ 替换为你在浏览器登录微博后，从 DevTools -> Application -> Cookie 中复制的 Cookie
          Cookie: "SUB=_2A25FKMrwDeRhGeNI6lAS9S3MzjSIHXVmREI4rDV8PUNbmtANLVCgkW9NSJ8ke2x4cMNH9FgnHi7OutC9NB6Q91gX; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WW8WGfTFRvzq86dpyBls6cw5NHD95QfSo2Ee0-0eh-RWs4Dqcjdi--NiK.Xi-2Ri--ciKnRi-zNSo-p1hqf1hnE; ...", // ← ⚠️ 必填！模拟登录状态
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "请求微博接口失败",
      detail: error.response?.data || error.message,
    });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`✅ 服务器运行在：http://localhost:${PORT}`);
});
