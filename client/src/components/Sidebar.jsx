import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  AdminPanelSettingsOutlined,

} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
  {
    text: "Trang Chủ",
    route: "dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Quản Lý Chung",
    icon: null,
  },
  {
    text: "Quản Lý Công Ty",
    route: "companies",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Công Ty Bị Cấm",
    route: "manage-banned-companies",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Xác Thực Công Ty",
    route: "review-company-verification",
    icon: <Groups2Outlined />,
  },
  {
    text: "Quản Lý Người Dùng",
    route: "users",
    icon: <Groups2Outlined />,
  },
  {
    text: "Quản lý Bài Đăng",
    route: "jobposts",
    icon: <ReceiptLongOutlined />,
  },
 
  {
    text: "",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
 
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              boxShadow: isNonMobile ? "4px 0 20px rgba(0,0,0,0.08)" : "none",
            },
          }}
        >
          <Box width="100%" height="100%" display="flex" flexDirection="column">
            {/* Header Section */}
            <Box m="1.5rem 2rem 1.5rem 2rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: `linear-gradient(135deg, ${theme.palette.primary[400]} 0%, ${theme.palette.primary[600]} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary[400], 0.3)}`,
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" color="white">
                      E
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h4" 
                    fontWeight="bold"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary[400]} 0%, ${theme.palette.primary[600]} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    JobStreet
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary[400], 0.1),
                      }
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <Divider sx={{ mx: 2, opacity: 0.6 }} />

            {/* Navigation List */}
            <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", mt: 1 }}>
              <List sx={{ px: 1.5 }}>
                {navItems.map(({ text, route, icon }) => {
                  if (!icon) {
                    return (
                      <Typography 
                        key={text} 
                        sx={{ 
                          m: "1.5rem 0 0.75rem 1.5rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: alpha(theme.palette.secondary[200], 0.6),
                        }}
                      >
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = route || text.toLowerCase();

                  return (
                    <ListItem key={text} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          borderRadius: "12px",
                          backgroundColor:
                            active === lcText
                              ? alpha(theme.palette.primary[400], 0.15)
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[500]
                              : theme.palette.secondary[100],
                          transition: "all 0.2s ease-in-out",
                          py: 1.2,
                          px: 1.5,
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            backgroundColor: 
                              active === lcText
                                ? alpha(theme.palette.primary[400], 0.2)
                                : alpha(theme.palette.secondary[300], 0.08),
                            transform: "translateX(4px)",
                          },
                          "&::before": active === lcText ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "20%",
                            bottom: "20%",
                            width: "4px",
                            borderRadius: "0 4px 4px 0",
                            background: `linear-gradient(180deg, ${theme.palette.primary[400]} 0%, ${theme.palette.primary[600]} 100%)`,
                          } : {},
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "40px",
                            color:
                              active === lcText
                                ? theme.palette.primary[500]
                                : theme.palette.secondary[200],
                            transition: "color 0.2s ease-in-out",
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={text}
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            fontWeight: active === lcText ? 600 : 500,
                          }}
                        />
                        {active === lcText && (
                          <ChevronRightOutlined 
                            sx={{ 
                              ml: "auto",
                              fontSize: "1.2rem",
                            }} 
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            {/* Profile Section */}
            <Box sx={{ mt: "auto" }}>
              <Divider sx={{ mx: 2, opacity: 0.6 }} />
              <Box 
                sx={{
                  m: "1.5rem 1.5rem 1.5rem 1.5rem",
                  p: 1.5,
                  borderRadius: "12px",
                  backgroundColor: alpha(theme.palette.primary[400], 0.08),
                  border: `1px solid ${alpha(theme.palette.primary[400], 0.15)}`,
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary[400], 0.12),
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary[400], 0.15)}`,
                  }
                }}
              >
                <FlexBetween textTransform="none" gap="1rem">
                  <Box
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="44px"
                    width="44px"
                    borderRadius="12px"
                    sx={{ 
                      objectFit: "cover",
                      border: `2px solid ${alpha(theme.palette.primary[400], 0.3)}`,
                    }}
                  />
                  <Box textAlign="left" flex={1}>
                    <Typography
                      fontWeight="bold"
                      fontSize="0.95rem"
                      sx={{ 
                        color: theme.palette.secondary[100],
                        mb: 0.25,
                      }}
                    >
                      {user.name || "ADMIN"}
                    </Typography>
                    <Typography
                      fontSize="0.8rem"
                      sx={{ 
                        color: alpha(theme.palette.secondary[200], 0.8),
                      }}
                    >
                      {user.occupation || "admin"}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small"
                    sx={{
                      color: theme.palette.secondary[300],
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary[400], 0.1),
                        transform: "rotate(90deg)",
                        transition: "transform 0.3s ease-in-out",
                      }
                    }}
                  >
                    <SettingsOutlined fontSize="small" />
                  </IconButton>
                </FlexBetween>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;