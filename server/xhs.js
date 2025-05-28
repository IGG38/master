const cors = require('cors');
const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

// 使用 CORS 中间件，解决跨域问题
app.use(cors());

// 读取 cookie 文件
const cookiesPath = path.resolve(__dirname, 'xhs-cookie.txt');
const rawCookie = fs.readFileSync(cookiesPath, 'utf-8');
const cookies = rawCookie.split('; ').map((pair) => {
  const [name, value] = pair.split('=');
  return {
    name,
    value,
    domain: '.xiaohongshu.com',
    path: '/',
    httpOnly: false,
    secure: false,
  };
});

// 获取小红书用户信息
async function getXhsUserInfo(uid) {
  const browser = await chromium.launch({ headless: true });
  // 创建带有 cookie 的 context
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'zh-CN',
  });
  await context.addCookies(cookies);

  const page = await context.newPage();
  const url = `https://www.xiaohongshu.com/user/profile/${uid}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
    await page.waitForLoadState('load');
    console.log('当前页面 URL:', page.url());

    const userInfo = await page.evaluate(() => {
      return {
        nickname: document.querySelector('.user-name')?.innerText || '',
        avatar: document.querySelector('.user-image img')?.src || '', // 更健壮的方式获取头像
        friends_count: document.querySelectorAll('.sCnO6dhe')[0]?.innerText || '', // 关注数
        followers_count: document.querySelectorAll('.sCnO6dhe')[1]?.innerText || '', // 粉丝数
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

app.get('/api/xhs-info', async (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    return res.status(400).json({ code: 1, message: '缺少 uid 参数' });
  }

  try {
    const userInfo = await getXhsUserInfo(uid);
    res.json({ code: 0, message: 'success', data: userInfo });
  } catch (err) {
    res.status(500).json({ code: 1, message: '抓取失败', error: err.message });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`✅ 服务器运行在：http://localhost:${PORT}`);
});
