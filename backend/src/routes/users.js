const express = require('express');
const router = express.Router();
const { getTotalVisitors, getValidUsers, getRecentVisitors, getUsers } = require('../config/database');

// 获取用户统计数据
router.get('/stats', async (req, res) => {
  try {
    const [totalVisitors, validUsers, recentVisitors] = await Promise.all([
      getTotalVisitors(),
      getValidUsers(),
      getRecentVisitors()
    ]);

    res.json({
      success: true,
      data: {
        totalVisitors,
        validUsers,
        recentVisitors,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('获取用户统计数据失败:', error);
    res.status(500).json({
      success: false,
      message: '获取用户统计数据失败',
      error: error.message
    });
  }
});

// 获取用户列表
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const search = req.query.search || '';

    const result = await getUsers(page, pageSize, search);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取用户列表失败',
      error: error.message
    });
  }
});

// 获取访问总人数
router.get('/total-visitors', async (req, res) => {
  try {
    const totalVisitors = await getTotalVisitors();
    res.json({
      success: true,
      data: {
        totalVisitors,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('获取访问总人数失败:', error);
    res.status(500).json({
      success: false,
      message: '获取访问总人数失败',
      error: error.message
    });
  }
});

// 获取有效用户数
router.get('/valid-users', async (req, res) => {
  try {
    const validUsers = await getValidUsers();
    res.json({
      success: true,
      data: {
        validUsers,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('获取有效用户数失败:', error);
    res.status(500).json({
      success: false,
      message: '获取有效用户数失败',
      error: error.message
    });
  }
});

// 获取近一个月访问人数
router.get('/recent-visitors', async (req, res) => {
  try {
    const recentVisitors = await getRecentVisitors();
    res.json({
      success: true,
      data: {
        recentVisitors,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('获取近一个月访问人数失败:', error);
    res.status(500).json({
      success: false,
      message: '获取近一个月访问人数失败',
      error: error.message
    });
  }
});

module.exports = router;