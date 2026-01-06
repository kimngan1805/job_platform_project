import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../global/Sidebar';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100vw', overflowX: 'hidden' }}>
      <CssBaseline />
      
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Nội dung chính bên phải - Đẩy full màn hình */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Chiếm toàn bộ phần còn lại của chiều ngang
          width: { sm: `calc(100% - 260px)` }, // Trừ đi chiều rộng của Sidebar (260px)
          bgcolor: '#F4F6F8',
          minHeight: '100vh',
          p: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;