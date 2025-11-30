import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetBannedCompaniesQuery, useUnbanCompanyMutation } from "state/api";
import Header from "components/Header";

const BannedCompanies = () => {
  const theme = useTheme();
  // Lấy dữ liệu công ty bị cấm
  const { data, isLoading } = useGetBannedCompaniesQuery();
  // Khởi tạo mutation Bỏ Cấm
  const [unbanCompany] = useUnbanCompanyMutation();

  const handleUnban = async (companyId) => {
    if (window.confirm("Bạn có chắc chắn muốn BỎ CẤM công ty này không?")) {
      try {
        await unbanCompany(companyId).unwrap();
        alert("Công ty đã được bỏ cấm thành công!");
      } catch (error) {
        console.error("Lỗi khi bỏ cấm công ty:", error);
        alert("Lỗi: Không thể bỏ cấm công ty.");
      }
    }
  };

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 0.8,
    // },
    {
      field: "name",
      headerName: "Tên Công Ty",
      flex: 1.2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 1.5,
    },
    {
      field: "banDate",
      headerName: "Ngày Cấm",
      flex: 1,
      // Hiển thị ngày cấm từ bannedDetails
      valueGetter: (params) => {
        const date = params.row.bannedDetails?.banDate;
        return date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A';
      },
    },
    {
      field: "banReason",
      headerName: "Lý do Cấm",
      flex: 2,
      // Hiển thị lý do cấm từ bannedDetails
      valueGetter: (params) => params.row.bannedDetails?.reason || "Không rõ",
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleUnban(params.row._id)}
          sx={{
            color: theme.palette.primary[900],
            // backgroundColor: theme.palette.success.light, // Dùng màu xanh/thành công cho hành động bỏ cấm
            fontWeight: 'bold',
            "&:hover": {
                backgroundColor: theme.palette.success.dark,
            }
          }}
        >
          BỎ CẤM
        </Button>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CÔNG TY BỊ CẤM" subtitle="Danh sách các công ty đã bị cấm khỏi hệ thống." />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          // Cấu hình DataGrid theo theme đã có
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
        
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default BannedCompanies;