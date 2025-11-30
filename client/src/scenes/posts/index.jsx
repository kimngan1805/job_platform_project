import React, { useState, useMemo } from "react";
import {
  Box,
  useTheme,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Typography,
  Button,
  alpha,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  useGetJobPostsQuery,
  useUpdateJobPostStatusMutation,
  useDeleteJobPostMutation,
} from "state/api";
import Header from "components/Header";
import {
  CheckCircleOutline,
  Close,
  DeleteForever,
  Refresh,
  Block,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import FlexBetween from "components/FlexBetween";

// const statusOptions = [
//   { value: "all", label: "Tất cả", color: "default" },
//   { value: "pending", label: "Chờ duyệt", color: "warning", count: 0 },
//   { value: "approved", label: "Đã duyệt", color: "success", count: 0 },
//   { value: "rejected", label: "Bị từ chối", color: "error", count: 0 },
//   { value: "closed", label: "Đã đóng", color: "info", count: 0 },
// ];

const JobPosts = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, refetch } = useGetJobPostsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const [updateStatus] = useUpdateJobPostStatusMutation();
  const [deletePost] = useDeleteJobPostMutation();

  // Tính toán số lượng từng trạng thái
  const statusCounts = useMemo(() => {
    if (!data?.jobPosts) return {};
    return data.jobPosts.reduce((acc, post) => {
      acc[post.status] = (acc[post.status] || 0) + 1;
      return acc;
    }, {});
  }, [data?.jobPosts]);

  const handleStatusUpdate = async (id, status, reason = null) => {
    const actionText =
      status === "approved"
        ? "duyệt"
        : status === "rejected"
        ? "từ chối"
        : "đóng";
    if (!window.confirm(`Bạn có chắc muốn ${actionText} bài đăng này?`)) return;

    try {
      await updateStatus({ id, status, reason }).unwrap();
      toast.success(`Đã ${actionText} bài đăng thành công!`);
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Cập nhật thất bại");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "⚠️ HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!\nBạn có chắc chắn muốn XÓA VĨNH VIỄN bài đăng này?"
      )
    )
      return;

    try {
      await deletePost(id).unwrap();
      toast.success("Đã xóa bài đăng vĩnh viễn");
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Xóa thất bại");
    }
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Box width="100%" p="1rem 1.5rem" bgcolor={theme.palette.background.alt}>
        <FlexBetween>
          <GridToolbarQuickFilter
            placeholder="Tìm kiếm tiêu đề, công ty, ngành nghề..."
            debounceMs={600}
            sx={{
              width: "400px",
              "& .MuiInputBase-root": {
                bgcolor: theme.palette.background.default,
              },
            }}
          />
          <Button
            startIcon={<Refresh />}
            onClick={() => refetch()}
            variant="contained"
            size="small"
          >
            Làm mới
          </Button>
        </FlexBetween>
      </Box>
    </GridToolbarContainer>
  );

  const columns = [
    {
      field: "title",
      headerName: "Tiêu đề tuyển dụng",
      flex: 1.8,
      renderCell: (params) => (
        <Typography fontWeight="600" color="primary" noWrap>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "companyName",
      headerName: "Công ty",
      flex: 1,
      valueGetter: (params) => params.row.companyRef?.name || "Không xác định",
    },
    {
      field: "industry",
      headerName: "Ngành nghề",
      flex: 0.9,
    },
    {
      field: "location",
      headerName: "Địa điểm",
      flex: 0.9,
    },
    {
      field: "salary",
      headerName: "Mức lương",
      flex: 0.8,
      valueGetter: (params) =>
        params.row.salaryMin
          ? `${params.row.salaryMin.toLocaleString()} - ${params.row.salaryMax.toLocaleString()} VNĐ`
          : "Thoả thuận",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.8,
      renderCell: (params) => {
        const status = params.value;
        const config = {
          pending: { label: "Chờ duyệt", color: "warning" },
          approved: { label: "Đã duyệt", color: "success" },
          rejected: { label: "Bị từ chối", color: "error" },
          closed: { label: "Đã đóng", color: "info" },
        }[status] || { label: status, color: "default" };

        return (
          <Chip
            label={config.label}
            color={config.color}
            size="small"
            sx={{ minWidth: 90, fontWeight: 600 }}
          />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày đăng",
      flex: 0.9,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1.2,
      sortable: false,
      renderCell: (params) => {
        const { status, _id } = params.row;
        return (
          <Stack direction="row" spacing={0.5}>
            {/* SỬA ĐỔI: Nút Duyệt bài (Hiện khi Pending HOẶC Rejected) */}
            {status === "pending" && (
              <Tooltip title="Duyệt bài">
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => handleStatusUpdate(_id, "approved")}
                >
                  <CheckCircleOutline fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {/* Nút Từ chối bài (Chỉ hiện khi Pending) */}
            {status === "pending" && (
              <Tooltip title="Từ chối bài">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    const reason = prompt("Lý do từ chối (bắt buộc):");
                    if (reason?.trim()) {
                      handleStatusUpdate(_id, "rejected", reason.trim());
                    }
                  }}
                >
                  <Block fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {/* Nút Đóng tin (ngừng nhận hồ sơ) */}
            {status === "approved" && (
              <Tooltip title="Đóng tin (ngừng nhận hồ sơ)">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => handleStatusUpdate(_id, "closed")}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {/* Nút Xóa vĩnh viễn (Luôn hiện) */}
            <Tooltip title="Xóa vĩnh viễn">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(_id)}
              >
                <DeleteForever fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="QUẢN LÝ TIN TUYỂN DỤNG"
        subtitle="Duyệt, từ chối và quản lý tất cả bài đăng việc làm"
      />

      {/* Thống kê trạng thái */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: theme.palette.background.alt,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={600}
          mb={1.5}
          color="text.secondary"
        >
          Lọc theo trạng thái
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          {[
            { value: "all", label: "Tất cả", color: "primary" },
            { value: "pending", label: "Chờ duyệt", color: "warning" },
            { value: "approved", label: "Đã duyệt", color: "success" },
            { value: "rejected", label: "Bị từ chối", color: "error" },
            { value: "closed", label: "Đã đóng", color: "info" },
          ].map((item) => {
            const count =
              item.value === "all"
                ? data?.total || 0
                : statusCounts[item.value] || 0;
            const isActive = statusFilter === item.value;

            return (
              <Button
                key={item.value}
                variant={isActive ? "contained" : "outlined"}
                color={item.color}
                size="medium"
                onClick={() => setStatusFilter(item.value)}
                startIcon={isActive && <CheckCircleOutline fontSize="small" />}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: 140,
                  py: 1,
                  boxShadow: isActive ? 3 : 1,
                  border: isActive
                    ? "none"
                    : `1.5px solid ${theme.palette.divider}`,
                  bgcolor: isActive ? `${item.color}.main` : "transparent",
                  color: isActive
                    ? theme.palette.getContrastText(
                        theme.palette[item.color].main
                      )
                    : "inherit",
                  "&:hover": {
                    boxShadow: 4,
                    bgcolor: isActive
                      ? `${item.color}.dark`
                      : alpha(theme.palette[item.color].main, 0.08),
                  },
                  transition: "all 0.25s ease",
                }}
              >
                {item.label}
                <Chip
                  label={count}
                  size="small"
                  sx={{
                    ml: 1.5,
                    fontWeight: "bold",
                    height: 24,
                    bgcolor: isActive
                      ? "rgba(255,255,255,0.3)"
                      : alpha(theme.palette[item.color].main, 0.15),
                    color: isActive ? "white" : theme.palette[item.color].dark,
                    backdropFilter: "blur(4px)",
                  }}
                />
              </Button>
            );
          })}
        </Stack>
      </Paper>

      {/* Bảng dữ liệu */}
      <Paper elevation={3}>
        <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              fontSize: "0.925rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              fontWeight: 600,
            },
            "& .MuiDataGrid-row:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        >
          <DataGrid
            loading={isLoading}
            rows={data?.jobPosts || []}
            columns={columns}
            rowCount={data?.total || 0}
            getRowId={(row) => row._id}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSortModelChange={(model) => setSort(model[0] || {})}
            components={{ Toolbar: CustomToolbar }}
            rowsPerPageOptions={[20, 50, 100]}
            disableSelectionOnClick
            sx={{ bgcolor: theme.palette.background.default }}
            slots={{
              loadingOverlay: LinearProgress,
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default JobPosts;
