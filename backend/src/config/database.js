const mysql = require('mysql2/promise');
require('dotenv').config();

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mini_program',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 模拟用户数据（在没有数据库的情况下使用）
let mockUsers = [];
function generateMockUsers() {
  if (mockUsers.length > 0) return mockUsers;
  
  const nicknames = ['小明', '小红', '张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'];
  
  for (let i = 1; i <= 150; i++) {
    const firstVisit = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
    const lastVisit = new Date(firstVisit.getTime() + Math.random() * 60 * 24 * 60 * 60 * 1000);
    
    mockUsers.push({
      id: i,
      openid: `wx_${Math.random().toString(36).substr(2, 20)}`,
      nickname: nicknames[Math.floor(Math.random() * nicknames.length)] + i,
      phone: Math.random() > 0.3 ? `138${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}` : '',
      firstVisit: firstVisit.toISOString().slice(0, 19).replace('T', ' '),
      lastVisit: lastVisit.toISOString().slice(0, 19).replace('T', ' '),
      visitCount: Math.floor(Math.random() * 50) + 1
    });
  }
  return mockUsers;
}

// 获取访问总人数
async function getTotalVisitors() {
  try {
    // 尝试从数据库获取
    // const [rows] = await pool.execute('SELECT COUNT(*) as count FROM users');
    // return rows[0].count;
    
    // 模拟数据
    const users = generateMockUsers();
    return users.length;
  } catch (error) {
    console.error('获取访问总人数失败:', error);
    return generateMockUsers().length;
  }
}

// 获取有效用户数（已授权手机号的人数）
async function getValidUsers() {
  try {
    // 尝试从数据库获取
    // const [rows] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE phone IS NOT NULL AND phone != ""');
    // return rows[0].count;
    
    // 模拟数据
    const users = generateMockUsers();
    return users.filter(user => user.phone && user.phone !== '').length;
  } catch (error) {
    console.error('获取有效用户数失败:', error);
    return generateMockUsers().filter(user => user.phone && user.phone !== '').length;
  }
}

// 获取近一个月访问人数
async function getRecentVisitors() {
  try {
    // 尝试从数据库获取
    // const [rows] = await pool.execute(
    //   'SELECT COUNT(*) as count FROM users WHERE lastVisit >= DATE_SUB(NOW(), INTERVAL 1 MONTH)'
    // );
    // return rows[0].count;
    
    // 模拟数据
    const users = generateMockUsers();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return users.filter(user => new Date(user.lastVisit) >= oneMonthAgo).length;
  } catch (error) {
    console.error('获取近一个月访问人数失败:', error);
    return generateMockUsers().length;
  }
}

// 获取用户列表（带分页和搜索）
async function getUsers(page = 1, pageSize = 10, search = '') {
  try {
    // 尝试从数据库获取
    // let query = 'SELECT * FROM users';
    // let countQuery = 'SELECT COUNT(*) as total FROM users';
    // 
    // if (search) {
    //   query += ' WHERE openid LIKE ? OR nickname LIKE ? OR phone LIKE ?';
    //   countQuery += ' WHERE openid LIKE ? OR nickname LIKE ? OR phone LIKE ?';
    // }
    // 
    // query += ' ORDER BY lastVisit DESC LIMIT ? OFFSET ?';
    // 
    // const searchTerm = `%${search}%`;
    // const offset = (page - 1) * pageSize;
    // 
    // const [rows] = await pool.execute(query, search ? 
    //   [searchTerm, searchTerm, searchTerm, pageSize, offset] : 
    //   [pageSize, offset]
    // );
    // 
    // const [countRows] = await pool.execute(countQuery, search ? 
    //   [searchTerm, searchTerm, searchTerm] : 
    //   []
    // );
    // 
    // return {
    //   users: rows,
    //   total: countRows[0].total,
    //   page,
    //   pageSize
    // };
    
    // 模拟数据
    const users = generateMockUsers();
    let filteredUsers = users;
    
    if (search) {
      filteredUsers = users.filter(user => 
        user.openid.toLowerCase().includes(search.toLowerCase()) ||
        user.nickname.toLowerCase().includes(search.toLowerCase()) ||
        (user.phone && user.phone.includes(search))
      );
    }
    
    const total = filteredUsers.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = filteredUsers.slice(start, end);
    
    return {
      users: paginatedUsers,
      total,
      page,
      pageSize
    };
  } catch (error) {
    console.error('获取用户列表失败:', error);
    return {
      users: [],
      total: 0,
      page,
      pageSize
    };
  }
}

module.exports = {
  pool,
  getTotalVisitors,
  getValidUsers,
  getRecentVisitors,
  getUsers
};