import React, { useState } from "react";
import { 
    Box, 
    useTheme, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button, 
    IconButton,
    Typography,
    Select,
    MenuItem,
    Tooltip, // Đã được thêm vào để khắc phục lỗi trước
    Divider
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminsQuery, useUpdateUserMutation } from "state/api"; 
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from 'react-toastify'; 
import { alpha } from '@mui/material/styles';
// import FlexBetween from "components/FlexBetween"; // Giả định component này có sẵn


const Admin = () => {
    const theme = useTheme();
    // Hook cập nhật người dùng
    const [updateUser] = useUpdateUserMutation(); 
    const { data, isLoading, refetch } = useGetAdminsQuery();

    // State cho Dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Xử lý mở Dialog
    const handleOpenEdit = (user) => {
        setCurrentUser(user);
        setOpenDialog(true);
    };

    // Xử lý đóng Dialog
    const handleClose = () => {
        setOpenDialog(false);
        setCurrentUser(null);
    };

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    // Xử lý lưu thay đổi
    const handleSave = async () => {
        if (!currentUser.name || !currentUser.email || !currentUser.role) {
             toast.error("Tên và Email không được để trống.");
             return;
        }

        try {
            // Thực hiện mutation để gửi dữ liệu cập nhật lên server
            await updateUser({
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                role: currentUser.role, 
            }).unwrap();
            
            toast.success(`Cập nhật Admin ${currentUser.name} thành công!`);
            
            handleClose();
            refetch(); // Tải lại danh sách
        } catch (err) {
            // Lỗi 409 (Email trùng) hoặc lỗi validation 400
            const errorMessage = err.data?.message || "Cập nhật thất bại.";
            toast.error(errorMessage);
        }
    };


    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Tên Admin",
            flex: 0.8,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1.2,
        },
        {
            field: "role",
            headerName: "Vai trò",
            flex: 0.6,
            renderCell: (params) => {
                const roleMap = {
                    'admin': 'Quản trị viên',
                    'employer': 'Nhà tuyển dụng',
                    'jobseeker': 'Ứng viên',
                };
                return roleMap[params.value] || params.value;
            },
        },
        {
            field: "actions",
            headerName: "Hành động",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <Tooltip title="Chỉnh sửa">
                    <IconButton 
                        color="primary"
                        onClick={() => handleOpenEdit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="QUẢN LÝ QUẢN TRỊ VIÊN" subtitle="Danh sách và quản lý các tài khoản Admin." />
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
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
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
                    components={{
                        ColumnMenu: CustomColumnMenu,
                    }}
                />
            </Box>

            {/* Edit Dialog (FORM CHỈNH SỬA) */}
            {currentUser && (
                <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm"
                    PaperProps={{ sx: { 
                        bgcolor: theme.palette.background.alt, 
                        border: `1px solid ${alpha(theme.palette.secondary[100], 0.1)}` 
                    }}}
                >
                    <DialogTitle sx={{ color: theme.palette.secondary[200], fontSize: "1.25rem", fontWeight: 600 }}>
                        Chỉnh sửa thông tin Quản trị viên
                    </DialogTitle>
                    <Divider sx={{ bgcolor: alpha(theme.palette.secondary[700], 0.4) }} />

                    <DialogContent>
                        <Box sx={{ mb: 2, p: 1, borderRadius: '6px', bgcolor: alpha(theme.palette.primary[600], 0.1) }}>
                            <Typography variant="body2" color={theme.palette.primary.light} fontWeight="bold">
                                ID người dùng: {currentUser._id}
                            </Typography>
                        </Box>

                        <Typography variant="subtitle1" color={theme.palette.secondary[300]} mt={2} mb={1}>
                            Thông tin cơ bản
                        </Typography>

                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Tên Admin"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={currentUser.name || ''}
                            onChange={handleChange}
                            sx={{ mb: 2, bgcolor: theme.palette.background.default }}
                        />

                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={currentUser.email || ''}
                            onChange={handleChange}
                            sx={{ mb: 2, bgcolor: theme.palette.background.default }}
                        />
                        
                        <Typography variant="subtitle1" color={theme.palette.secondary[300]} mt={2} mb={1}>
                            Cài đặt quyền hạn
                        </Typography>

                        <Box sx={{ minWidth: 120, mb: 2 }}>
                            <Select
                                fullWidth
                                id="role-select"
                                name="role"
                                value={currentUser.role || 'admin'}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ bgcolor: theme.palette.background.default }}
                            >
                                <MenuItem value="admin">Quản trị viên</MenuItem>
                                <MenuItem value="employer">Nhà tuyển dụng</MenuItem>
                                <MenuItem value="jobseeker">Ứng viên</MenuItem>
                            </Select>
                        </Box>
                        <Typography variant="caption" color={theme.palette.warning.light}>
                            Lưu ý: Thay đổi vai trò người dùng có thể ảnh hưởng đến quyền truy cập hệ thống.
                        </Typography>

                    </DialogContent>
                    <DialogActions sx={{ p: "1rem 1.5rem" }}>
                        <Button onClick={handleClose} sx={{ color: theme.palette.secondary[300] }}>Hủy</Button>
                        <Button onClick={handleSave} variant="contained" color="success">
                            Lưu Thay Đổi
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

        </Box>
    );
};

export default Admin;