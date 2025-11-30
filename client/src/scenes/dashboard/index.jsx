import React from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  Chip,
  Paper,
  alpha,
  LinearProgress,
  Stack,
} from "@mui/material";
import {
  Groups,
  Business,
  Work,
  CheckCircle,
  HourglassEmpty,
  TrendingUp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { useGetDashboardQuery } from "state/api";
import Header from "components/Header";
import StatBox from "components/StatBox";
import FlexBetween from "components/FlexBetween";
import OverviewChart from "components/OverviewChart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  const stats = data || {};

  const statBoxes = [
    {
      title: "Tổng Người Dùng",
      value: stats.totalUsers || 0,
      increase: `+${stats.newUsersThisMonth || 0} tháng này`,
      icon: <Groups fontSize="large" />,
      color: theme.palette.primary.main,
      link: "/users",
    },
    {
      title: "Công Ty Xác Thực",
      value: stats.verifiedCompanies || 0,
      increase: `${stats.totalCompanies || 0} công ty đăng ký`,
      icon: <Business fontSize="large" />,
      color: theme.palette.success.main,
      link: "/companies",
    },
    {
      title: "Tin Đăng Chờ Duyệt",
      value: stats.pendingJobPosts || 0,
      increase: "Cần xử lý ngay",
      icon: <HourglassEmpty fontSize="large" />,
      color: theme.palette.warning.main,
      link: "/jobposts",
    },
    {
      title: "Tin Đăng Hoạt Động",
      value: stats.approvedJobPosts || 0,
      increase: "Đang hiển thị",
      icon: <CheckCircle fontSize="large" />,
      color: theme.palette.info.main,
      link: "/jobposts",
    },
  ];

  const recentPostsColumns = [
    { field: "title", headerName: "Tiêu đề", flex: 2 },
    {
      field: "companyName",
      headerName: "Công ty",
      flex: 1.2,
      valueGetter: (p) => p.row.companyRef?.name || "Chưa xác định",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.8,
      renderCell: (params) => {
        const map = {
          pending: { label: "Chờ duyệt", color: "warning" },
          approved: { label: "Đã duyệt", color: "success" },
          rejected: { label: "Bị từ chối", color: "error" },
          closed: { label: "Đã đóng", color: "default" },
        };
        const config = map[params.value] || { label: params.value, color: "default" };
        return <Chip label={config.label} color={config.color} size="small" sx={{ fontWeight: 600 }} />;
      },
    },
    { field: "applicantsCount", headerName: "Ứng tuyển", flex: 0.7, align: "center" },
    {
      field: "createdAt",
      headerName: "Ngày đăng",
      flex: 1,
      valueFormatter: (p) => new Date(p.value).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <Box m={{ xs: "1rem", md: "1.5rem 2.5rem" }}>
      {/* HEADER */}
      <FlexBetween>
        <Header
          title="TỔNG QUAN HỆ THỐNG"
          subtitle="Chào mừng quay trở lại! Dưới đây là các chỉ số mới nhất."
        />
        <Link to="/jobposts">
          <Button
            variant="contained"
            size="large"
            startIcon={<Work />}
            sx={{
              bgcolor: theme.palette.primary[600],
              "&:hover": { bgcolor: theme.palette.primary[700] },
              fontWeight: 600,
              textTransform: "none",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            }}
          >
            Quản Lý Tin Đăng
          </Button>
        </Link>
      </FlexBetween>

      {/* 4 STAT BOXES */}
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={3}
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? "span 3" : "span 12" },
        }}
      >
        {statBoxes.map((box) => (
          <StatBox key={box.title} {...box} />
        ))}
      </Box>

      {/* BIỂU ĐỒ LỚN – FULL WIDTH */}
      <Paper
        elevation={8}
        sx={{
          mt: 4,
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: theme.palette.background.default,
          boxShadow: `0 12px 40px ${alpha(theme.palette.mode === "dark" ? "#000" : "#000", 0.08)}`,
        }}
      >
        <Box p={3} borderBottom={`1px solid ${theme.palette.divider}`}>
          <FlexBetween>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Xu Hướng Tin Tuyển Dụng – 12 Tháng Gần Nhất
              </Typography>
              <Stack direction="row" alignItems="center" gap={1} mt={1}>
                <TrendingUp color="success" />
                <Typography color="success.main" fontWeight={600}>
                  +{stats.growthRate || 12}% so với cùng kỳ
                </Typography>
              </Stack>
            </Box>
          </FlexBetween>
        </Box>

        <Box height={480} position="relative">
          {isLoading ? (
            <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
          ) : (
            <OverviewChart
              data={stats.monthlyJobPostStats || []}
              isDashboard={true}
            />
          )}
        </Box>
      </Paper>

      {/* BẢNG 5 BÀI ĐĂNG MỚI NHẤT – NẰM PHÍA DƯỚI BIỂU ĐỒ */}
      <Paper
        elevation={8}
        sx={{
          mt: 4,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: `0 12px 40px ${alpha(theme.palette.mode === "dark" ? "#000" : "#000", 0.08)}`,
        }}
      >
        <Box
          p={3}
          borderBottom={`1px solid ${theme.palette.divider}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight={700}>
            5 Bài Đăng Mới Nhất
          </Typography>
          <Link to="/jobposts">
            <Button variant="text" color="primary" endIcon="→">
              Xem tất cả
            </Button>
          </Link>
        </Box>

        <Box height={520}>
          <DataGrid
            loading={isLoading}
            rows={stats.recentJobPosts || []}
            columns={recentPostsColumns}
            getRowId={(row) => row._id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            hideFooter
            disableSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.04),
              },
              "& .MuiDataGrid-cell": {
                py: 2,
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;