const express = require('express');
const router = express.Router();
const { getTotalBlacklist, getActiveBlacklist, getBlacklist } = require('../config/blacklist');

// 获取黑名单统计数据
router.get('/stats', async (req, res) => {
  try {
    const [totalBlacklist, activeBlacklist] = await Promise.all([
      getTotalBlacklist(),
      getActiveBlacklist()
    ]);

    res.json({
      success: true,
      data: {
        totalBlacklist,
        activeBlacklist,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('获取黑名单统计数据失败:', error);
    res.status(500).json({
      success: false,
      message: '获取黑名单统计数据失败',
      error: error.message
    });
  }
});

// 获取黑名单列表
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';

    const result = await getBlacklist(page, pageSize, search, status);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('获取黑名单列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取黑名单列表失败',
      error: error.message
    });
  }
});

// 获取黑名单总数
router.get('/total', async (req, res) => {
  try {
    const totalBlacklist = await getTotalBlacklist();
    res.json({
      success: true,
      data: {
        totalBlacklist,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('获取黑名单总数失败:', error);
    res.status(500).json({
      success: false,
      message: '获取黑名单总数失败',
      error: error.message
    });
  }
});

// 获取生效黑名单数
router.get('/active', async (req, res) => {
  try {
    const activeBlacklist = await getActiveBlacklist();
    res.json({
      success: true,
      data: {
        activeBlacklist,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('获取生效黑名单数失败:', error);
    res.status(500).json({
      success: false,
      message: '获取生效黑名单数失败',
      error: error.message
    });
  }
});

module.exports = router;