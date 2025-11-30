import React, { useState } from "react";
import { 
  Box, 
  useTheme, 
  TextField, 
  FormControl,
  InputLabel,
  Select, 
  MenuItem, 
  Button, 
  InputAdornment, 
} from "@mui/material";
import { Search } from "@mui/icons-material"; 
import { useGetUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween"; 

const roleOptions = [
  { value: '', label: 'Tất cả vai trò' },
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'employer', label: 'Nhà tuyển dụng' },
  { value: 'jobseeker', label: 'Ứng viên' },
];

const Users = () => {
  const theme = useTheme();
  
  // State quản lý giá trị tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading } = useGetUsersQuery({
    search: searchTerm, // Gửi state tìm kiếm đã xác nhận
    role: roleFilter, // Gửi state lọc vai trò
  });

  if (isLoading) return <div>Đang tải...</div>

  console.log("data", data);

  // Ánh xạ giá trị từ DB sang tiếng Việt
  const roleMap = {
    'admin': 'Quản trị viên',
    'employer': 'Nhà tuyển dụng',
    'jobseeker': 'Ứng viên',
  };

  const statusMap = {
    'active': 'Hoạt động',
    'inactive': 'Không hoạt động',
    'banned': 'Bị cấm',
  };

  // Hàm xử lý tìm kiếm khi người dùng nhấn Enter hoặc nút
  const handleSearch = () => {
    setSearchTerm(searchInput); // Cập nhật state chính để kích hoạt re-fetch RTK Query
  };

  const columns = [
    
    {
      field: "name",
      headerName: "Tên đăng nhập",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "role",
      headerName: "Vai trò",
      flex: 0.8,
      valueGetter: (params) => roleMap[params.row.role] || params.row.role,
    },
    {
      field: "companyName",
      headerName: "Công ty",
      flex: 1.2,
      valueGetter: (params) =>
        params.row.role === "employer" && params.row.companyRef
          ? params.row.companyRef.name
          : "",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.8,
      valueGetter: (params) => statusMap[params.row.status] || params.row.status,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header 
        title="QUẢN LÝ NGƯỜI DÙNG" 
        subtitle="Danh sách tất cả người dùng, nhà tuyển dụng và ứng viên" 
      />

      {/* --- Thanh tìm kiếm và Bộ lọc --- */}
      <FlexBetween sx={{ mt: '20px', mb: '10px' }} gap="1.5rem">
        {/* Bộ lọc Vai trò */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Lọc theo Vai trò</InputLabel>
          <Select
            value={roleFilter}
            label="Lọc theo Vai trò"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {roleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Ô Tìm kiếm */}
        <TextField
          label="Tìm kiếm người dùng"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
                <Button 
                    variant="contained" 
                    onClick={handleSearch}
                    sx={{
                        ml: 1,
                        backgroundColor: theme.palette.primary[500],
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary[600],
                        }
                    }}
                >
                    Tìm
                </Button>
            ),
          }}
          sx={{ width: '400px' }}
        />
      </FlexBetween>
      {/* ---------------------------------- */}
      
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          // Thêm các tính năng của DataGrid nếu cần (toolbar, pagination, sorting)
        />
      </Box>
    </Box>
  );
};

export default Users;