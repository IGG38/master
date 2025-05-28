const cors = require('cors');
const express = require('express');
const { chromium } = require('playwright');

const app = express();
const PORT = 3004;

// 使用 CORS 中间件，解决跨域问题
app.use(cors());

async function getDouyinUserInfo(uid) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://www.weibo.com/u/${uid}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('.ProfileHeader_name_1KbBs', { timeout: 15000 });

    const data = await page.evaluate(() => {
      return {
        nickname: document.querySelector('.ProfileHeader_name_1KbBs')?.innerText || '',
        avatar: document.querySelectorAll('.woo-avatar-img')[0]?.src || '',
        friends_count: document.querySelectorAll('.ProfileHeader_h5_1XppQ')[0]?.innerText || '',
        followers_count: document.querySelectorAll('.ProfileHeader_h5_1XppQ')[1]?.innerText || '',
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

app.get('/api/wb-info', async (req, res) => {
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
