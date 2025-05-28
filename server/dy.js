const cors = require('cors');
const express = require('express');
const { chromium } = require('playwright');

const app = express();
const PORT = 3002;

// 使用 CORS 中间件，解决跨域问题
app.use(cors());

async function getDouyinUserInfo(uid) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://www.douyin.com/user/${uid}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);

    const data = await page.evaluate(() => {
      return {
        nickname: document.querySelector('.j5WZzJdp')?.innerText || '',
        avatar: document.querySelectorAll('.RlLOO79h')[0]?.src || '',
        friends_count: document.querySelectorAll('.sCnO6dhe')[0]?.innerText || '',
        followers_count: document.querySelectorAll('.sCnO6dhe')[1]?.innerText || '',
      };
    });

    return data;
  } catch (err) {
    console.error('抓取失败：', err);
    throw err;
  } finally {
    await browser.close();
  }
}

app.get('/api/dy-info', async (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    return res.status(400).json({ error: '缺少 uid 参数' });
  }

  try {
    const data = await getDouyinUserInfo(uid);
    res.json({ data: data });
  } catch (err) {
    res.status(500).json({ error: '抓取失败' });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`✅ 服务器运行在：http://localhost:${PORT}`);
});
