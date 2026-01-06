import React from 'react';
import { 
  Box, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Typography, Divider, Avatar 
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

// Import Icon (Cài @mui/icons-material nếu chưa có)
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const drawerWidth = 260; // Chiều rộng sidebar

const menuItems = [
  { text: "Trang Chủ", icon: <HomeOutlinedIcon />, path: "/" },
  { text: "Quản Lý Công Ty", icon: <BusinessOutlinedIcon />, path: "/companies" },
  { text: "Công Ty Bị Cấm", icon: <BlockOutlinedIcon />, path: "/banned" },
  { text: "Xác Thực Công Ty", icon: <VerifiedUserOutlinedIcon />, path: "/verify" },
  { text: "Quản Lý Người Dùng", icon: <PeopleOutlinedIcon />, path: "/users" },
  { text: "Quản Lý Bài Đăng", icon: <ArticleOutlinedIcon />, path: "/posts" },
  { text: "Admin", icon: <AdminPanelSettingsOutlinedIcon />, path: "/admin" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại để active menu

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none', // Bỏ đường viền cho đẹp
          backgroundColor: '#fff', // Màu nền trắng
          color: '#333',
        },
      }}
    >
      {/* 1. Phần Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
         {/* Thay bằng ảnh logo thật của Ngân */}
         <Box sx={{ width: 32, height: 32, bgcolor: '#5D5FEF', borderRadius: 1 }} />
         <Typography variant="h6" fontWeight="bold" color="#5D5FEF">
            JobStreet
         </Typography>
      </Box>

      {/* 2. Danh sách Menu */}
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <Typography variant="caption" sx={{ ml: 3, mb: 1, color: '#888', fontWeight: 'bold' }}>
           QUẢN LÝ CHUNG
        </Typography>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 2,
                    borderRadius: '8px',
                    // Màu sắc khi được chọn (Active)
                    backgroundColor: isActive ? '#EEEFFE' : 'transparent',
                    color: isActive ? '#5D5FEF' : '#666',
                    '&:hover': { backgroundColor: '#F5F5F5' },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? '#5D5FEF' : '#666', 
                    minWidth: 40 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px', fontWeight: isActive ? 600 : 400 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* 3. Phần User Profile ở dưới đáy */}
      <Box sx={{ p: 2, m: 2, bgcolor: '#F5F7FA', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
        <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">ADMIN</Typography>
            <Typography variant="caption" color="textSecondary">admin</Typography>
        </Box>
        <SettingsOutlinedIcon sx={{ color: '#888', cursor: 'pointer' }} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;