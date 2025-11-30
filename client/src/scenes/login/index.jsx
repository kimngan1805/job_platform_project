import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Paper,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state"; // Import action setLogin
import { useLoginAdminMutation } from "state/api";
import FlexBetween from "components/FlexBetween";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await loginAdmin(formData).unwrap();

      // Dispatch action lưu token và user vào Redux state
      dispatch(
        setLogin({
          user: result.user,
          token: result.token,
        })
      );
    //   localStorage.setItem("adminToken", result.token);

      navigate("/dashboard"); // Chuyển hướng đến trang Dashboard
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại Email/Mật khẩu hoặc quyền Admin."
      );
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary[600]} 0%, ${theme.palette.primary[800]} 100%)`,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "400px",
          borderRadius: "12px",
          bgcolor: theme.palette.background.alt,
        }}
      >
        <FlexBetween mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.secondary[300]}
          >
            Admin Panel Login
          </Typography>
        </FlexBetween>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Email Admin"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ bgcolor: theme.palette.background.default }}
          />

          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3, bgcolor: theme.palette.background.default }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={isLoading}
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            {isLoading ? "Đang xử lý..." : "ĐĂNG NHẬP"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
