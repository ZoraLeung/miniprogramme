const mysql = require('mysql2/promise');
require('dotenv').config();

// 使用已有的连接池
const { pool } = require('./database');

// 模拟黑名单数据
let mockBlacklist = [];

function generateMockBlacklist() {
  if (mockBlacklist.length > 0) return mockBlacklist;
  
  const names = [
    '张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十',
    '陈一', '刘二', '杨三', '黄四', '马五', '朱六', '胡七', '林八',
    '高九', '梁十', '徐一', '郭二', '罗三', '宋四', '谢五', '唐六',
    '韩七', '冯八', '邓九', '曹十', '彭一', '曾二', '萧三', '田四',
    '董五', '袁六', '潘七', '于八', '蒋九', '蔡十', '余一', '杜二'
  ];
  
  const reasons = [
    '违反考试纪律',
    '提供虚假信息',
    '恶意刷单',
    '扰乱课堂秩序',
    '拖欠学费',
    '恶意投诉',
    '违约行为',
    '不当言论',
    '影响其他学员',
    '多次爽约'
  ];
  
  for (let i = 1; i <= 45; i++) {
    const createTime = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const expiryTime = new Date(createTime.getTime() + (Math.random() * 365 + 180) * 24 * 60 * 60 * 1000);
    const isActive = expiryTime > new Date() && Math.random() > 0.2;
    
    mockBlacklist.push({
      id: i,
      name: names[Math.floor(Math.random() * names.length)] + (i > 20 ? i : ''),
      idCard: `${Math.floor(Math.random() * 900000 + 100000)}${Math.floor(Math.random() * 90000000 + 10000000)}`,
      phone: `138${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      createTime: createTime.toISOString().slice(0, 19).replace('T', ' '),
      expiryTime: expiryTime.toISOString().slice(0, 19).replace('T', ' '),
      isActive: isActive,
      creator: '管理员',
      remarks: Math.random() > 0.7 ? '情况严重，需重点关注' : ''
    });
  }
  
  return mockBlacklist;
}

// 获取黑名单总数
async function getTotalBlacklist() {
  try {
    // 尝试从数据库获取
    // const [rows] = await pool.execute('SELECT COUNT(*) as count FROM blacklist');
    // return rows[0].count;
    
    // 模拟数据
    const blacklist = generateMockBlacklist();
    return blacklist.length;
  } catch (error) {
    console.error('获取黑名单总数失败:', error);
    return generateMockBlacklist().length;
  }
}

// 获取生效黑名单数
async function getActiveBlacklist() {
  try {
    // 尝试从数据库获取
    // const [rows] = await pool.execute(
    //   'SELECT COUNT(*) as count FROM blacklist WHERE isActive = 1 AND expiryTime > NOW()'
    // );
    // return rows[0].count;
    
    // 模拟数据
    const blacklist = generateMockBlacklist();
    const now = new Date();
    return blacklist.filter(item => 
      item.isActive && new Date(item.expiryTime) > now
    ).length;
  } catch (error) {
    console.error('获取生效黑名单数失败:', error);
    return generateMockBlacklist().filter(item => 
      item.isActive && new Date(item.expiryTime) > new Date()
    ).length;
  }
}

// 获取黑名单列表（带分页和搜索）
async function getBlacklist(page = 1, pageSize = 10, search = '', status = '') {
  try {
    // 模拟数据
    const blacklist = generateMockBlacklist();
    let filteredBlacklist = blacklist;
    
    // 搜索过滤
    if (search) {
      filteredBlacklist = blacklist.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.idCard.includes(search) ||
        (item.phone && item.phone.includes(search)) ||
        item.reason.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // 状态过滤
    if (status === 'active') {
      const now = new Date();
      filteredBlacklist = filteredBlacklist.filter(item => 
        item.isActive && new Date(item.expiryTime) > now
      );
    } else if (status === 'expired') {
      const now = new Date();
      filteredBlacklist = filteredBlacklist.filter(item => 
        !item.isActive || new Date(item.expiryTime) <= now
      );
    }
    
    const total = filteredBlacklist.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedBlacklist = filteredBlacklist.slice(start, end);
    
    return {
      blacklist: paginatedBlacklist,
      total,
      page,
      pageSize
    };
  } catch (error) {
    console.error('获取黑名单列表失败:', error);
    return {
      blacklist: [],
      total: 0,
      page,
      pageSize
    };
  }
}

module.exports = {
  getTotalBlacklist,
  getActiveBlacklist,
  getBlacklist,
  generateMockBlacklist
};