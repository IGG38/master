import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// 示例路由
app.post("/register", (req, res) => {
  console.log("接收到的注册数据:", req.body);
  res.status(200).send("注册成功");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
