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

    const userInfo = await page.evaluate(() => {
      const getText = (selector) => document.querySelector(selector)?.innerText || '';
      const statElements = document.querySelectorAll('.sCnO6dhe');
      const avatarElements = document.querySelectorAll('.RlLOO79h');

      return {
        nickname: getText('.j5WZzJdp'),
        friends_count: statElements[0]?.innerText || '',
        followers_count: statElements[1]?.innerText || '',
        id: getText('.TVGQz3SI') || '',
        avatar: avatarElements[0]?.src || '',
      };
    });

    return userInfo;
  } catch (err) {
    console.error('抓取失败：', err);
    throw err;
  } finally {
    await browser.close();
  }
}

app.get('/api/douyin-user', async (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    return res.status(400).json({ error: '缺少 uid 参数' });
  }

  try {
    const userInfo = await getDouyinUserInfo(uid);
    res.json({ user: userInfo });
  } catch (err) {
    res.status(500).json({ error: '抓取失败' });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`✅ 服务器运行在：http://localhost:${PORT}`);
});
