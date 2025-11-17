import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Header from "components/Header";
import {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "state/api"; // Import đầy đủ các hook
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // <-- 2. Import CSS
// Lưu ý: Cần đảm bảo thư viện react-toastify đã được cài đặt và ToastContainer đã có trong App.js

// Component hiển thị thông tin chi tiết một Công ty
const Company = ({
  // Dữ liệu công ty
  _id,
  name,
  description,
  email,
  address,
  industry,
  website,
  status, // Thêm status
  isBanned,
  bannedDetails,
  // Hàm xử lý
  handleAction,
  handleOpenEdit,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Hàm hiển thị trạng thái cấm (Dựa trên status)
  const getStatusDisplay = () => {
    if (status === 'Banned') {
      return (
        <Typography variant="body1" color={theme.palette.error.main} fontWeight="bold">
          Trạng thái: ĐÃ BỊ CẤM
        </Typography>
      );
    }
    if (status === 'Verified') {
      return (
        <Typography variant="body1" color={theme.palette.success.main} fontWeight="bold">
          Trạng thái: ĐÃ XÁC THỰC
        </Typography>
      );
    }
    return (
      <Typography variant="body1" color={theme.palette.warning.main}>
        Trạng thái: Đang chờ xử lý
      </Typography>
    );
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        border: status === 'Banned' ? `2px solid ${theme.palette.error.main}` : 'none', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
          {industry || "Chưa phân loại"}
        </Typography>
        <Typography variant="h5" component="div" fontWeight="bold">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.0rem" }} color={theme.palette.secondary[400]}>
          Email: {email}
        </Typography>
        <Typography sx={{ mb: "1.0rem" }} color={theme.palette.secondary[400]}>
          Địa chỉ: {address}
        </Typography>

        {/* Trạng thái (Verified, Banned, Pending) */}
        {getStatusDisplay()}

        <Typography variant="body2" mt="1rem">{description}</Typography>
      </CardContent>

      {/* CÁC NÚT HÀNH ĐỘNG */}
      <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ẩn Chi Tiết" : "Xem Thêm"}
        </Button>
        <Box>
          {/* Nút Sửa */}
          <IconButton onClick={() => handleOpenEdit({ _id, name, description, email, address, industry, website, status })} title="Sửa">
            <EditIcon sx={{ color: theme.palette.secondary[300] }} />
          </IconButton>

          {/* Nút Xác thực */}
          {status !== 'Verified' && status !== 'Banned' && (
            <IconButton onClick={() => handleAction(_id, 'VERIFY')} title="Xác thực">
              <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
            </IconButton>
          )}
          
          {/* Nút Cấm / Bỏ Cấm */}
          {status !== 'Banned' ? (
            <IconButton onClick={() => handleAction(_id, 'BAN')} title="Cấm">
              <BlockIcon sx={{ color: theme.palette.error.main }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleAction(_id, 'UNBAN')} title="Bỏ Cấm">
              <LockOpenIcon sx={{ color: theme.palette.warning.main }} />
            </IconButton>
          )}

          {/* Nút Xóa (Soft Delete) */}
          {status !== 'Deleted' && (
            <IconButton onClick={() => handleAction(_id, 'DELETE')} title="Xóa">
              <DeleteIcon sx={{ color: theme.palette.grey[700] }} />
            </IconButton>
          )}
        </Box>
      </CardActions>

      {/* PHẦN CHI TIẾT ẨN */}
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>ID Công Ty: {_id}</Typography>
          <Typography>Website: {website || "Không có"}</Typography>
          
          {isBanned && bannedDetails && (
            <Box mt="1rem">
              <Typography fontWeight="bold" color={theme.palette.error.light}>
                Lý do cấm: {bannedDetails.reason}
              </Typography>
              <Typography fontStyle="italic">
                Ngày cấm: {bannedDetails.banDate ? new Date(bannedDetails.banDate).toLocaleDateString('vi-VN') : "N/A"}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

// Component Cha (Trang Quản lý Công ty)
const Companies = () => {
  const { data, isLoading, refetch } = useGetCompaniesQuery(); // Dùng hook mới
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  // Mutations
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();

  // State cho Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({});

  // Mở Dialog để tạo mới
  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentCompany({ name: '', description: '', email: '', address: '', industry: '', website: '' });
    setOpenDialog(true);
  };

  // Mở Dialog để chỉnh sửa
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

  // Lưu (Thêm mới hoặc Cập nhật)
  const handleSave = async () => {
    try {
      if (isEditing) {
        // Loại bỏ các trường không cần thiết khi update
        const { _id, isBanned, isVerified, bannedDetails, createdAt, updatedAt, __v, ...updates } = currentCompany;
        
        await updateCompany({ id: _id, ...updates }).unwrap();
        toast.success("Cập nhật công ty thành công!");
      } else {
        await createCompany(currentCompany).unwrap();
        toast.success("Thêm công ty mới thành công!");
      }
      handleClose();
      refetch();
    } catch (err) {
      toast.error(`Lỗi: ${err.data?.message || err.error}`);
    }
  };

  // Xử lý các hành động (Xác thực, Cấm, Bỏ Cấm, Xóa)
  const handleAction = async (id, actionType) => {
    try {
      let updateData = {};
      let successMessage = '';
      let banReason = '';

      if (actionType === 'VERIFY') {
        if (!window.confirm("Xác nhận Xác thực công ty này?")) return;
        updateData = { status: 'Verified' };
        successMessage = "Xác thực công ty thành công!";

      } else if (actionType === 'BAN') {
        banReason = prompt("Vui lòng nhập lý do CẤM công ty:");
        if (!banReason) return; 
        updateData = { status: 'Banned', banReason: banReason };
        successMessage = "Cấm công ty thành công!";
        
      } else if (actionType === 'UNBAN') {
        if (!window.confirm("Xác nhận BỎ CẤM công ty này?")) return;
        updateData = { status: 'Pending', unban: true }; 
        successMessage = "Bỏ cấm công ty thành công!";

      } else if (actionType === 'DELETE') {
        if (!window.confirm("Bạn có chắc chắn muốn XÓA (Soft Delete) công ty này không?")) return;
        
        await deleteCompany(id).unwrap();
        toast.success("Xóa công ty thành công!");
        refetch();
        return;
      }
      
      await updateCompany({ id, ...updateData }).unwrap();
      toast.success(successMessage);
      refetch();
      
    } catch (err) {
      toast.error(`Lỗi: ${err.data?.message || err.error}`);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="QUẢN LÝ CÔNG TY" subtitle="Xem danh sách và quản lý các công ty trên hệ thống." />

      {/* Nút Thêm Mới */}
      <Box mb="1.5rem" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenCreate}
        >
          Thêm Công ty Mới
        </Button>
      </Box>

      {/* Danh sách Thẻ Công ty */}
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data
            .filter(company => company.status !== 'Deleted') // Lọc công ty đã bị xóa
            .map((company) => (
              <Company
                key={company._id}
                {...company} // Truyền tất cả props của company
                handleAction={handleAction} // Truyền hàm xử lý hành động
                handleOpenEdit={() => handleOpenEdit(company)} // Truyền hàm mở edit
              />
            ))}
        </Box>
      ) : (
        <>Đang tải...</>
      )}

      {/* Dialog Thêm/Sửa */}
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Sửa Thông Tin Công ty' : 'Thêm Công ty Mới'}</DialogTitle>
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
            disabled={isEditing} 
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
            name="website"
            label="Website"
            type="url"
            fullWidth
            variant="standard"
            value={currentCompany.website || ''}
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
            {isEditing ? 'Lưu Thay Đổi' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Companies;