import React, { useState } from "react";
// import bcrypt from 'bcrypt';
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
  Chip,
  Divider,
  Tooltip,
  Avatar,
  Stack,
  FormControl, // Cần import
  InputLabel, // Cần import
  Select, // Cần import
  MenuItem, // Cần import
  InputAdornment, // Cần import
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material"; // Dùng tên Search cho icon
import Header from "components/Header";
import {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "state/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FlexBetween from "components/FlexBetween";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  status,
  isBanned,
  bannedDetails,
  // Hàm xử lý
  handleAction,
  handleOpenEdit,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusChip = () => {
    if (status === "Banned") {
      return (
        <Chip
          icon={<BlockIcon />}
          label="ĐÃ BỊ CẤM"
          color="error"
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      );
    }
    if (status === "Verified") {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="ĐÃ XÁC THỰC"
          color="success"
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      );
    }
    return (
      <Chip label="Chờ xử lý" color="warning" size="small" variant="outlined" />
    );
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "12px",
        border:
          status === "Banned"
            ? `2px solid ${theme.palette.error.main}`
            : `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        {/* Header với icon và chip status */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 48,
              height: 48,
            }}
          >
            <BusinessIcon />
          </Avatar>
          {getStatusChip()}
        </Box>

        {/* Tên công ty */}
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          sx={{
            mb: 1,
            color: theme.palette.primary.main,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </Typography>

        {/* Ngành nghề */}
        {industry && (
          <Chip
            label={industry}
            size="small"
            sx={{
              mb: 2,
              backgroundColor: theme.palette.secondary[800],
              color: theme.palette.secondary[100],
            }}
          />
        )}

        {/* Thông tin liên hệ */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon
              sx={{ fontSize: 18, color: theme.palette.secondary[300] }}
            />
            <Typography
              variant="body2"
              color={theme.palette.secondary[400]}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {email}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon
              sx={{ fontSize: 18, color: theme.palette.secondary[300] }}
            />
            <Typography
              variant="body2"
              color={theme.palette.secondary[400]}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {address}
            </Typography>
          </Box>
        </Stack>

        {/* Mô tả ngắn */}
        <Typography
          variant="body2"
          color={theme.palette.neutral[400]}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "40px",
          }}
        >
          {description || "Chưa có mô tả"}
        </Typography>
      </CardContent>

      <Divider sx={{ my: 1 }} />

      {/* CÁC NÚT HÀNH ĐỘNG */}
      <CardActions
        sx={{ px: 2, pb: 2, justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <Button
          variant="text"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          endIcon={
            <ExpandMoreIcon
              sx={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          }
          sx={{
            color: theme.palette.secondary[300],
            "&:hover": {
              backgroundColor: theme.palette.secondary[800],
            },
          }}
        >
          {isExpanded ? "Ẩn bớt" : "Chi tiết"}
        </Button>

        <Box display="flex" gap={0.5}>
          {/* Nút Sửa */}
          <Tooltip title="Chỉnh sửa">
            <IconButton
              onClick={() =>
                handleOpenEdit({
                  _id,
                  name,
                  description,
                  email,
                  address,
                  industry,
                  website,
                  status,
                })
              }
              size="small"
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.info.light,
                  color: theme.palette.info.main,
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Nút Xác thực */}
          {status !== "Verified" && status !== "Banned" && (
            <Tooltip title="Xác thực công ty">
              <IconButton
                onClick={() => handleAction(_id, "VERIFY")}
                size="small"
                sx={{
                  color: theme.palette.success.main,
                  "&:hover": {
                    backgroundColor: theme.palette.success.light,
                  },
                }}
              >
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {/* Nút Cấm / Bỏ Cấm */}
          {status !== "Banned" ? (
            <Tooltip title="Cấm công ty">
              <IconButton
                onClick={() => handleAction(_id, "BAN")}
                size="small"
                sx={{
                  color: theme.palette.error.main,
                  "&:hover": {
                    backgroundColor: theme.palette.error.light,
                  },
                }}
              >
                <BlockIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Bỏ cấm công ty">
              <IconButton
                onClick={() => handleAction(_id, "UNBAN")}
                size="small"
                sx={{
                  color: theme.palette.warning.main,
                  "&:hover": {
                    backgroundColor: theme.palette.warning.light,
                  },
                }}
              >
                <LockOpenIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {/* Nút Xóa */}
          {status !== "Deleted" && (
            <Tooltip title="Xóa công ty">
              <IconButton
                onClick={() => handleAction(_id, "DELETE")}
                size="small"
                sx={{
                  color: theme.palette.grey[500],
                  "&:hover": {
                    backgroundColor: theme.palette.error.light,
                    color: theme.palette.error.main,
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardActions>

      {/* PHẦN CHI TIẾT MỞ RỘNG */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent
          sx={{ pt: 2, backgroundColor: theme.palette.background.default }}
        >
          <Stack spacing={1.5}>
            <Box>
              <Typography
                variant="caption"
                color={theme.palette.secondary[500]}
              >
                ID Công ty
              </Typography>
              <Typography variant="body2" fontFamily="monospace">
                {_id}
              </Typography>
            </Box>

            {website && (
              <Box>
                <Typography
                  variant="caption"
                  color={theme.palette.secondary[500]}
                >
                  Website
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <LanguageIcon
                    sx={{ fontSize: 18, color: theme.palette.secondary[300] }}
                  />
                  <Typography
                    variant="body2"
                    component="a"
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {website}
                  </Typography>
                </Box>
              </Box>
            )}

            {isBanned && bannedDetails && (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "8px",
                  backgroundColor: theme.palette.error.light,
                  border: `1px solid ${theme.palette.error.main}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color={theme.palette.error.dark}
                  mb={0.5}
                >
                  Thông tin cấm
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.error.dark}
                  mb={0.5}
                >
                  <strong>Lý do:</strong> {bannedDetails.reason}
                </Typography>
                <Typography variant="caption" color={theme.palette.error.dark}>
                  Ngày cấm:{" "}
                  {bannedDetails.banDate
                    ? new Date(bannedDetails.banDate).toLocaleDateString(
                        "vi-VN"
                      )
                    : "N/A"}
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

// Component Cha (Trang Quản lý Công ty)
const Companies = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState(JSON.stringify({ createdAt: "desc" })); // Mặc định: Mới nhất trước

  // State cho Filtering & Searching
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Lọc theo trạng thái
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetCompaniesQuery({
    page,
    pageSize,
    sort,
    search,
    status: statusFilter,
  });
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  // Lọc các công ty có status khác "Deleted" trong client-side cho render Card
  const companiesToRender = data?.companies || [];
  // RTK Query chỉ trả về các công ty có status != 'Deleted' (như đã định nghĩa trong Server Controller)
  const totalCount = data?.total || 0;

  const statusOptions = [
    { value: "", label: "Tất cả trạng thái (Trừ Đã Xóa)" },
    { value: "Verified", label: "Đã xác thực" },
    { value: "Pending", label: "Chờ xử lý" },
    { value: "Banned", label: "Đã bị cấm" },
  ];

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
    setCurrentCompany({
      name: "",
      description: "",
      email: "",
      address: "",
      industry: "",
      website: "",
      ownerName: "",
      ownerEmail: "",
      ownerPassword: "",
    });
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
    setCurrentCompany({});
  };

  const handleChange = (e) => {
    setCurrentCompany({ ...currentCompany, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setSearch(searchInput); // Kích hoạt re-fetch với giá trị tìm kiếm
    setPage(1); // Reset về trang 1 khi tìm kiếm mới
  };

  // Lưu (Thêm mới hoặc Cập nhật)
  const handleSave = async () => {
    try {
      if (isEditing) {
        const {
          _id,
          isBanned,
          isVerified,
          bannedDetails,
          createdAt,
          updatedAt,
          __v,
          ...updates
        } = currentCompany;
        await updateCompany({ id: _id, ...updates }).unwrap();
        toast.success("Cập nhật công ty thành công!");
      } else {
        await createCompany(currentCompany).unwrap();
        toast.success("Tạo Công ty và Chủ sở hữu thành công!");
      }
      handleClose();
      refetch();
    } catch (err) {
      console.error("Chi tiết lỗi khi lưu:", err); // <-- Dòng này sẽ giúp bạn
      const errorMessage =
        err.data?.message || err.error || "Lỗi không xác định.";
      toast.error(`Lỗi: ${errorMessage}`);
    }
  };

  // Xử lý các hành động
  const handleAction = async (id, actionType) => {
    try {
      let updateData = {};
      let successMessage = "";
      let banReason = "";

      if (actionType === "VERIFY") {
        if (!window.confirm("Xác nhận Xác thực công ty này?")) return;
        updateData = { status: "Verified" };
        successMessage = "Xác thực công ty thành công!";
      } else if (actionType === "BAN") {
        banReason = prompt("Vui lòng nhập lý do CẤM công ty:");
        if (!banReason) return;
        updateData = { status: "Banned", banReason: banReason };
        successMessage = "Cấm công ty thành công!";
      } else if (actionType === "UNBAN") {
        if (!window.confirm("Xác nhận BỎ CẤM công ty này?")) return;
        updateData = { status: "Verified", unban: true };
        successMessage = "Bỏ cấm công ty thành công!";
      } else if (actionType === "DELETE") {
        if (
          !window.confirm(
            "Bạn có chắc chắn muốn XÓA (Soft Delete) công ty này không?"
          )
        )
          return;
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Header
          title="QUẢN LÝ CÔNG TY"
          subtitle="Xem danh sách và quản lý các công ty trên hệ thống."
        />

        {/* Nút Thêm Mới */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddBusinessIcon />}
          onClick={handleOpenCreate}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            },
          }}
        >
          Thêm Công ty Mới
        </Button>
      </Box>

      {/* --- Thanh tìm kiếm và Bộ lọc --- */}
      <FlexBetween sx={{ mb: "20px" }} gap="1.5rem">
        {/* Bộ lọc Trạng thái */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Lọc theo Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            label="Lọc theo Trạng thái"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1); // Reset về trang 1 khi thay đổi lọc
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Ô Tìm kiếm */}
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <TextField
            label="Tìm kiếm Công ty (Tên, Email, Ngành...)"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{ ml: 1, textTransform: "none" }}
                >
                  Tìm
                </Button>
              ),
            }}
            sx={{ width: "450px" }}
          />
        </Box>
      </FlexBetween>
      {/* ---------------------------------- */}

      {/* Danh sách Thẻ Công ty */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
                   {" "}
          <Typography variant="h6" color={theme.palette.secondary[400]}>
                        Đang tải dữ liệu...          {" "}
          </Typography>
                 {" "}
        </Box>
      ) : companiesToRender.length > 0 ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap={3}
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 1",
            },
          }}
        >
                   {" "}
          {companiesToRender // Sử dụng mảng an toàn
            .map(
              (
                company // KHÔNG CẦN .filter()
              ) => (
                <Company
                  key={company._id}
                  {...company}
                  handleAction={handleAction}
                  handleOpenEdit={() => handleOpenEdit(company)}
                />
              )
            )}
                 {" "}
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Typography variant="h6" color={theme.palette.secondary[400]}>
            Đang tải dữ liệu...
          </Typography>
        </Box>
      )}

      {/* Dialog Thêm/Sửa */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          {isEditing ? "✏️ Chỉnh sửa Công ty" : "➕ Thêm Công ty Mới"}
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          {/* PHẦN THÔNG TIN CHỦ SỞ HỮU */}
          {!isEditing && (
            <Box
              sx={{
                mb: 4,
                p: 3,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.default,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography
                variant="h6"
                color={theme.palette.primary.main}
                mb={2}
                fontWeight="bold"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <BusinessIcon /> Thông tin Chủ sở hữu
              </Typography>

              <Stack spacing={2}>
                <TextField
                  name="ownerName"
                  label="Tên Chủ sở hữu"
                  type="text"
                  fullWidth
                  value={currentCompany.ownerName || ""}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
                <TextField
                  name="ownerEmail"
                  label="Email Chủ sở hữu"
                  type="email"
                  fullWidth
                  value={currentCompany.ownerEmail || ""}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  helperText="Email để đăng nhập. Nếu đã tồn tại, sẽ liên kết tài khoản."
                />
                <TextField
                  name="ownerPassword"
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                  value={currentCompany.ownerPassword || ""}
                  onChange={handleChange}
                  required={!currentCompany.ownerEmail}
                  variant="outlined"
                  helperText="Bắt buộc nếu tạo tài khoản mới"
                />
              </Stack>
            </Box>
          )}

          {/* PHẦN THÔNG TIN CÔNG TY */}
          <Box>
            <Typography
              variant="h6"
              color={theme.palette.secondary.main}
              mb={2}
              fontWeight="bold"
            >
              📋 Thông tin Công ty
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                autoFocus
                name="name"
                label="Tên Công ty"
                type="text"
                fullWidth
                value={currentCompany.name || ""}
                onChange={handleChange}
                required
                variant="outlined"
              />

              <TextField
                name="email"
                label="Email công ty"
                type="email"
                fullWidth
                value={currentCompany.email || ""}
                onChange={handleChange}
                required
                disabled={isEditing}
                variant="outlined"
              />

              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <TextField
                  name="industry"
                  label="Ngành nghề"
                  type="text"
                  fullWidth
                  value={currentCompany.industry || ""}
                  onChange={handleChange}
                  variant="outlined"
                />

                <TextField
                  name="website"
                  label="Website"
                  type="url"
                  fullWidth
                  value={currentCompany.website || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Box>

              <TextField
                name="address"
                label="Địa chỉ"
                type="text"
                fullWidth
                multiline
                rows={2}
                value={currentCompany.address || ""}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                name="description"
                label="Mô tả công ty"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={currentCompany.description || ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Stack>
          </Box>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={handleClose}
            sx={{
              textTransform: "none",
              px: 3,
            }}
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              px: 4,
            }}
          >
            {isEditing ? "💾 Lưu thay đổi" : "✨ Tạo công ty"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Companies;
