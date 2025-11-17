import React, { useState } from "react";
import { 
  Box, Button, useTheme, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { toast } from 'react-toastify';
import { 
    useGetCompaniesQuery, 
    useUpdateCompanyMutation, 
    useDeleteCompanyMutation 
} from "state/api";

const ReviewCompanyVerification = () => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetCompaniesQuery();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({});

  // 1. Lọc dữ liệu: Chỉ lấy các công ty đang ở trạng thái Pending (Đang chờ duyệt)
  const pendingCompanies = data?.filter(company => company.status === 'Pending') || [];

  const handleOpenEdit = (company) => {
    setIsEditing(true);
    setCurrentCompany(company);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setCurrentCompany({ ...currentCompany, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { _id, ...updates } = currentCompany;
      await updateCompany({ id: _id, ...updates }).unwrap();
      toast.success("Cập nhật thông tin công ty thành công!");
      handleClose();
      refetch();
    } catch (err) {
      toast.error(`Lỗi cập nhật: ${err.data?.message || err.error}`);
    }
  };


  const handleAction = async (id, actionType) => {
    try {
        let updateData = {};
        let successMessage = '';
        let shouldConfirm = true;

        if (actionType === 'VERIFY') {
            if (!window.confirm("Bạn có chắc chắn muốn XÁC THỰC công ty này không?")) return;
            updateData = { status: 'Verified', isVerified: true };
            successMessage = "Xác thực công ty thành công! Trạng thái: Verified.";
            shouldConfirm = false;
            
        } else if (actionType === 'DELETE') {
            shouldConfirm = window.confirm("Bạn có chắc chắn muốn XÓA (Soft Delete) công ty này không?");
            if (!shouldConfirm) return;
            
            await deleteCompany(id).unwrap();
            toast.success("Xóa công ty thành công!");
            refetch();
            return;
        }

        if (shouldConfirm && !window.confirm(`Bạn có chắc chắn muốn thực hiện hành động ${actionType} không?`)) {
            return;
        }
        
        await updateCompany({ id, ...updateData }).unwrap();
        toast.success(successMessage);
        refetch();
        
    } catch (err) {
        toast.error(`Lỗi: ${err.data?.message || err.error}`);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Tên Công ty', flex: 1.5 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'industry', headerName: 'Ngành nghề', flex: 1 },
    { field: 'address', headerName: 'Địa chỉ', flex: 2 },
    {
      field: 'action',
      headerName: 'Hành động',
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Box>
            {/* Nút Sửa */}
            <IconButton onClick={() => handleOpenEdit(params.row)} title="Sửa chi tiết">
                <EditIcon sx={{ color: theme.palette.secondary[300] }} />
            </IconButton>

            {/* Nút Xác thực */}
            <Button
                variant="contained"
                size="small"
                onClick={() => handleAction(params.row._id, 'VERIFY')}
                startIcon={<CheckCircleIcon />}
                sx={{
                    ml: 1,
                    color: theme.palette.primary[600],
                    backgroundColor: theme.palette.success.light,
                    fontWeight: 'bold',
                    "&:hover": { backgroundColor: theme.palette.success.dark, }
                }}
            >
                DUYỆT
            </Button>

            {/* Nút Xóa (Soft Delete) */}
            <IconButton onClick={() => handleAction(params.row._id, 'DELETE')} title="Xóa hồ sơ">
                <DeleteIcon sx={{ color: theme.palette.error.main }} />
            </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header 
        title="HÀNG ĐỢI XÁC THỰC CÔNG TY" 
        subtitle="Xét duyệt yêu cầu xác thực thông tin công ty" 
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
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
          rows={pendingCompanies} // Dữ liệu đã được lọc
          columns={columns}
        />
      </Box>

      {/* Dialog Sửa Thông Tin Công ty */}
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Sửa Thông Tin Công Ty</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Tên Công ty"
            type="text"
            fullWidth
            variant="standard"
            value={currentCompany.name || ''}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={currentCompany.email || ''}
            onChange={handleChange}
            required
            disabled={true} // Không cho phép sửa Email khi đang sửa
          />
          <TextField
            margin="dense"
            name="industry"
            label="Ngành nghề"
            type="text"
            fullWidth
            variant="standard"
            value={currentCompany.industry || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Địa chỉ"
            type="text"
            fullWidth
            multiline
            rows={2}
            variant="standard"
            value={currentCompany.address || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Mô tả"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="standard"
            value={currentCompany.description || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Lưu Thay Đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewCompanyVerification;