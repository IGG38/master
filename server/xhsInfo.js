const express = require('express');
const cors = require('cors');

const { chromium } = require('playwright-extra');
const stealth = require('playwright-extra-plugin-stealth')();

chromium.use(stealth);

const app = express();
app.use(cors());

async function detectPageType(page) {
  const url = page.url();

  if (url.includes('login') || url.includes('security') || url.includes('verify')) {
    return 'security';
  }

  if (url.includes('/user/profile/')) {
    const userNameEl = await page.$('.user-name');
    if (userNameEl) {
      return 'profile';
    } else {
      return 'profile-empty';
    }
  }

  return 'unknown';
}

app.get('/api/xhs-user', async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).json({ error: '缺少 user_id 参数' });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.xiaohongshu.com/user/profile/${uid}`, {
      waitUntil: 'networkidle',
      timeout: 20000,
    });

    const pageType = await detectPageType(page);

    if (pageType === 'security') {
      return res.status(403).json({ error: '访问受限，触发安全验证' });
    }
    if (pageType === 'profile-empty') {
      return res.status(404).json({ error: '用户主页内容为空或未登录' });
    }
    if (pageType !== 'profile') {
      return res.status(400).json({ error: '无法识别的页面类型' });
    }

    const user = await page.evaluate(() => {
      return {
        name: document.querySelector('.user-name')?.innerText || '',
        desc: document.querySelector('.user-desc')?.innerText || '',
        noteCount: document.querySelector('.note-count')?.innerText || '',
        avatar: document.querySelector('img.avatar')?.src || '',
      };
    });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: '爬取失败', detail: err.message });
  } finally {
    await browser.close();
  }
});

app.listen(3002, () => {
  console.log('✅ 小红书服务运行于 http://localhost:3002');
});
