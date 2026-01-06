import React from 'react';
import { Box, Typography, Button, Chip, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GavelIcon from '@mui/icons-material/Gavel';

const BannedCompanies = () => {
  // 1. Định nghĩa cột bảng dựa trên hình mẫu Ngân gửi
  const columns = [
    { field: 'name', headerName: 'Tên Công Ty', flex: 1, fontWeight: 'bold' },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'address', headerName: 'Địa chỉ', flex: 1 },
    { field: 'bannedDate', headerName: 'Ngày Cấm', width: 150 },
    { 
      field: 'reason', 
      headerName: 'Lý do Cấm', 
      flex: 1.5,
      renderCell: (params) => (
        <Typography variant="body2" color="error" sx={{ fontStyle: 'italic' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          color="success" 
          size="small" 
          startIcon={<LockOpenIcon />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Gỡ cấm
        </Button>
      )
    }
  ];

  // 2. Dữ liệu giả (Mock Data)
  const rows = [
    { 
      id: 1, 
      name: 'Công ty Ma ABC', 
      email: 'scam@abc.com', 
      address: 'Quận 1, TP.HCM', 
      bannedDate: '01/01/2026', 
      reason: 'Đăng tin tuyển dụng lừa đảo, thu phí ứng viên trái phép.' 
    },
    { 
      id: 2, 
      name: 'Xây dựng XYZ', 
      email: 'contact@xyz.vn', 
      address: 'Hải Châu, Đà Nẵng', 
      bannedDate: '05/01/2026', 
      reason: 'Vi phạm điều khoản bảo mật dữ liệu người dùng nhiều lần.' 
    },
  ];

  return (
    <Box sx={{ p: 1 }}>
      {/* HEADER SECTION */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#5D5FEF" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GavelIcon fontSize="large" /> CÔNG TY BỊ CẤM
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Danh sách các công ty đã bị cấm khỏi hệ thống do vi phạm chính sách.
        </Typography>
      </Box>

      {/* TABLE SECTION */}
      <Paper sx={{ height: 600, width: '100%', bgcolor: '#fff', borderRadius: 2, boxShadow: 1, overflow: 'hidden' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{ 
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F9FAFB', // Màu nền header giống hình mẫu
              color: '#333',
              fontWeight: 'bold'
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default BannedCompanies;