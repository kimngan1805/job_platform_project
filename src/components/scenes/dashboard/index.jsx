import React from 'react';
import { 
  Box, Typography, Button, Grid, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip 
} from '@mui/material';

// Import Icon
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

// Component con: Thẻ số liệu (Stat Card)
const StatCard = ({ title, value, subtext, icon, color }) => {
  return (
    <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', borderRadius: 2, boxShadow: 1 }}>
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: color, fontWeight: 'medium' }}>
          {subtext}
        </Typography>
      </Box>
      <Box sx={{ 
        color: color, 
        bgcolor: `${color}20`, // Màu nền nhạt (độ trong suốt 20%)
        p: 1, borderRadius: 1, height: 'fit-content' 
      }}>
        {icon}
      </Box>
    </Paper>
  );
};

// Dữ liệu giả cho bảng (Mock Data)
const recentPosts = [
  { id: 1, title: "Frontend Developer ReactJS", company: "FPT Software", status: "Active", app: 12, date: "06/01/2026" },
  { id: 2, title: "Backend Java Spring Boot", company: "Viettel", status: "Pending", app: 5, date: "05/01/2026" },
  { id: 3, title: "Designer UI/UX", company: "VNG", status: "Active", app: 20, date: "04/01/2026" },
  { id: 4, title: "Business Analyst", company: "Techcombank", status: "Closed", app: 8, date: "03/01/2026" },
  { id: 5, title: "Tester Automation", company: "NashTech", status: "Pending", app: 3, date: "02/01/2026" },
];

const Dashboard = () => {
  return (
    <Box>
      {/* 1. HEADER SECTION */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#5D5FEF">
            TỔNG QUAN HỆ THỐNG
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Chào mừng quay trở lại! Dưới đây là các chỉ số mới nhất.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<WorkOutlineIcon />}
          sx={{ 
            bgcolor: '#8B80F9', 
            '&:hover': { bgcolor: '#7A70E0' },
            textTransform: 'none',
            borderRadius: 2,
            px: 3
          }}
        >
          Quản Lý Tin Đăng
        </Button>
      </Box>

      {/* 2. STATS CARDS (4 Cột) */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Tổng Người Dùng" 
            value="1,250" 
            subtext="+15 tháng này" 
            color="#5D5FEF" // Tím
            icon={<GroupOutlinedIcon fontSize="large" />} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Công Ty Xác Thực" 
            value="45" 
            subtext="0 công ty đăng ký mới" 
            color="#5D5FEF" 
            icon={<BusinessOutlinedIcon fontSize="large" />} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Tin Đăng Chờ Duyệt" 
            value="12" 
            subtext="Cần xử lý ngay" 
            color="#FFB020" // Vàng cam
            icon={<HourglassEmptyOutlinedIcon fontSize="large" />} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Tin Đăng Hoạt Động" 
            value="340" 
            subtext="Đang hiển thị" 
            color="#14B8A6" // Xanh ngọc
            icon={<CheckCircleOutlineIcon fontSize="large" />} 
          />
        </Grid>
      </Grid>

      {/* 3. CHART SECTION (Placeholder) */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 1, minHeight: 300 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Xu Hướng Tin Tuyển Dụng – 12 Tháng Gần Nhất
        </Typography>
        <Typography variant="caption" color="success.main" fontWeight="bold">
          ↗ +12% so với cùng kỳ
        </Typography>
        
        {/* Placeholder cho Chart */}
        <Box 
          sx={{ 
            height: 200, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#F9FAFB',
            borderRadius: 2,
            mt: 2,
            color: '#999'
          }}
        >
          Chưa có dữ liệu tin đăng trong 12 tháng gần nhất
        </Box>
      </Paper>

      {/* 4. TABLE SECTION */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">5 Bài Đăng Mới Nhất</Typography>
            <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>Xem tất cả →</Typography>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Công ty</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ứng tuyển</TableCell>
                <TableCell>Ngày đăng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPosts.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell fontWeight="bold">{row.title}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} 
                      size="small" 
                      color={
                        row.status === 'Active' ? 'success' : 
                        row.status === 'Pending' ? 'warning' : 'default'
                      } 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{row.app}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;