import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Chip, Avatar, IconButton, 
  Divider, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions, 
  LinearProgress, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import Grid from '@mui/material/Grid'; // MUI v6 sẽ tự hiểu đây là Grid v2

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import ZapIcon from '@mui/icons-material/FlashOn';
import XCircleIcon from '@mui/icons-material/CancelOutlined';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GavelIcon from '@mui/icons-material/Gavel';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Companies = () => {
  const [dbCompanies, setDbCompanies] = useState({ newToday: [], pending: [], verified: [], banned: [] });
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // DỮ LIỆU MẪU: Đã gán sẵn status 'pending' để luôn hiện nút Duyệt
  const mockData = [
    { id: 'm1', name: 'Tech Solutions Global', email: 'hr@techsol.com', address: 'Quận 1, TP.HCM', desc: 'Chuyên cung cấp giải pháp chuyển đổi số.', verification_status: 'pending' },
    { id: 'm2', name: 'Green Energy Corp', email: 'contact@green.vn', address: 'Cầu Giấy, Hà Nội', desc: 'Phát triển hệ thống năng lượng sạch.', verification_status: 'pending' },
    { id: 'm3', name: 'Logistics Express', email: 'admin@logi.com', address: 'Hải An, Hải Phòng', desc: 'Dịch vụ vận tải đa phương thức.', verification_status: 'pending' }
  ];

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/admin/companies');
      const result = await response.json();
      if (result.success) setDbCompanies(result.data);
    } catch (err) { console.error("Lỗi:", err); }
  };

  useEffect(() => {
    fetchCompanies();
    const interval = setInterval(fetchCompanies, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    if (id.toString().startsWith('m')) return alert("Dữ liệu mẫu không thể sửa!");
    try {
      const response = await fetch('http://localhost:5000/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if ((await response.json()).success) {
        setOpenProfile(false);
        fetchCompanies();
      }
    } catch (err) { alert("Lỗi!"); }
  };

  const handleViewProfile = (company) => {
    setSelectedCompany(company);
    setOpenProfile(true);
  };

  const CompanyCard = ({ company, color }) => {
    const name = company.company_name || company.name;
    const address = company.headquarters_address || company.address;
    const status = company.verification_status || company.status;

    return (
      <Paper elevation={0} sx={{ 
        p: 3, borderRadius: 4, border: `1px solid ${color}40`, bgcolor: '#fff',
        height: '450px', width: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        transition: '0.3s', '&:hover': { boxShadow: '0 12px 24px rgba(0,0,0,0.1)', transform: 'translateY(-4px)' }
      }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Avatar sx={{ bgcolor: color, borderRadius: 3, width: 50, height: 50 }}><BusinessIcon fontSize="large" /></Avatar>
          {company.created_at && <Chip label="Real-time" size="small" color="error" sx={{ fontWeight: 'bold' }} />}
        </Box>

        <Typography variant="h6" fontWeight="800" sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '32px' }}>
          {name}
        </Typography>

        <Stack spacing={1.5} mb={2}>
          <Typography variant="body2" color="textSecondary" noWrap sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><EmailIcon sx={{ fontSize: 18 }} /> {company.email || 'N/A'}</Typography>
          <Typography variant="body2" color="textSecondary" noWrap sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocationOnIcon sx={{ fontSize: 18 }} /> {address}</Typography>
        </Stack>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {company.description || company.desc}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          {/* HIỆN NÚT DUYỆT TRỪ KHI LÀ HÀNG BỊ CẤM */}
          {status !== 'rejected' && (
             <Button fullWidth variant="contained" onClick={() => handleUpdateStatus(company.id, 'verified')} sx={{ bgcolor: '#52C41A', borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}>Duyệt</Button>
          )}
          <Button fullWidth variant="outlined" onClick={() => handleViewProfile(company)} sx={{ color, borderColor: color, borderRadius: 2, textTransform: 'none' }}>Hồ sơ</Button>
          <IconButton sx={{ border: '1px solid #ddd', borderRadius: 2 }} color="error" onClick={() => handleUpdateStatus(company.id, 'rejected')}><XCircleIcon /></IconButton>
        </Stack>
      </Paper>
    );
  };

  const getDisplayList = (realList, sectionStatus) => {
    // Ép status cho mock data để nó hiện nút đúng theo hàng
    const mockWithStatus = mockData.map(m => ({ ...m, verification_status: sectionStatus }));
    const combined = [...realList, ...mockWithStatus];
    return combined.slice(0, 3); 
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#F4F6F8', minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Typography variant="h3" fontWeight="900" color="#1A1C2E">QUẢN LÝ DOANH NGHIỆP</Typography>
        <Button variant="contained" startIcon={<ZapIcon />} sx={{ bgcolor: '#9c27b0', borderRadius: 3, px: 4, py: 2, fontWeight: 'bold' }}>KIỂM TRA NHANH</Button>
      </Box>

      <SectionGroup title="MỚI GỬI HÔM NAY" companies={getDisplayList(dbCompanies.newToday, 'pending')} color="#FF4D4F" icon={<NewReleasesIcon />} CardComponent={CompanyCard} />
      <SectionGroup title="ĐANG CHỜ XỬ LÝ" companies={getDisplayList(dbCompanies.pending, 'pending')} color="#FAAD14" icon={<HourglassEmptyIcon />} CardComponent={CompanyCard} />
      <SectionGroup title="ĐÃ XÁC THỰC" companies={getDisplayList(dbCompanies.verified, 'verified')} color="#52C41A" icon={<VerifiedUserIcon />} CardComponent={CompanyCard} />
      <SectionGroup title="CÔNG TY BỊ CẤM" companies={getDisplayList(dbCompanies.banned, 'rejected')} color="#1A1C2E" icon={<GavelIcon />} CardComponent={CompanyCard} />

      {/* --- POPUP HỒ SƠ: ĐÃ PHỤC HỒI 100% CODE CỦA NGÂN --- */}
      <Dialog open={openProfile} onClose={() => setOpenProfile(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#F8F9FA', p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: '#5D5FEF', width: 60, height: 60 }}><BusinessIcon fontSize="large" /></Avatar>
            <Box>
              <Typography variant="h5" fontWeight="900">{selectedCompany?.company_name || selectedCompany?.name}</Typography>
              <Chip label={selectedCompany?.verification_status?.toUpperCase() || 'PENDING'} color={selectedCompany?.verification_status === 'verified' ? 'success' : 'warning'} size="small" sx={{ fontWeight: 'bold' }} />
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={4}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">Thông tin đăng ký</Typography>
              <List disablePadding>
                <ListItem sx={{ px: 0 }}><ListItemIcon><AssignmentIndIcon color="action" /></ListItemIcon><ListItemText primary="Mã số thuế" secondary={selectedCompany?.tax_code || 'Chưa cung cấp'} /></ListItem>
                <ListItem sx={{ px: 0 }}><ListItemIcon><EmailIcon color="action" /></ListItemIcon><ListItemText primary="Email liên hệ" secondary={selectedCompany?.email || 'N/A'} /></ListItem>
                <ListItem sx={{ px: 0 }}><ListItemIcon><LanguageIcon color="action" /></ListItemIcon><ListItemText primary="Website" secondary={selectedCompany?.website_url || 'Chưa có website'} /></ListItem>
                <ListItem sx={{ px: 0 }}><ListItemIcon><CalendarTodayIcon color="action" /></ListItemIcon><ListItemText primary="Ngày gửi yêu cầu" secondary={selectedCompany?.created_at ? new Date(selectedCompany.created_at).toLocaleDateString('vi-VN') : 'N/A'} /></ListItem>
              </List>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">Vị trí & Mô tả</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="textSecondary" fontWeight="bold">Địa chỉ trụ sở:</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, display: 'flex', gap: 1 }}><LocationOnIcon sx={{ fontSize: 16 }} /> {selectedCompany?.headquarters_address || selectedCompany?.address}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary" fontWeight="bold">Giới thiệu doanh nghiệp:</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-line', bgcolor: '#F4F6F8', p: 2, borderRadius: 2 }}>{selectedCompany?.description || selectedCompany?.desc || 'Không có mô tả chi tiết.'}</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: '#F8F9FA' }}>
          <Button onClick={() => setOpenProfile(false)} sx={{ fontWeight: 'bold' }}>Đóng lại</Button>
          {selectedCompany?.verification_status !== 'rejected' && (
            <>
              <Button variant="contained" color="error" onClick={() => handleUpdateStatus(selectedCompany.id, 'rejected')} sx={{ borderRadius: 2, fontWeight: 'bold' }}>Từ chối</Button>
              <Button variant="contained" color="success" onClick={() => handleUpdateStatus(selectedCompany.id, 'verified')} sx={{ borderRadius: 2, fontWeight: 'bold', px: 4 }}>Phê duyệt hồ sơ</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const SectionGroup = ({ title, companies, color, icon, CardComponent }) => (
  <Box sx={{ mb: 6 }}>
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Avatar sx={{ bgcolor: color, width: 40, height: 40, borderRadius: 2 }}>{icon}</Avatar>
      <Typography variant="h5" fontWeight="900" color="#333">{title}</Typography>
      <Chip label={companies.filter(c => !c.id.toString().startsWith('m')).length} sx={{ fontWeight: 'bold', bgcolor: `${color}15`, color }} />
      <Box sx={{ flexGrow: 1, height: '2px', bgcolor: '#ddd', ml: 2 }} />
    </Box>
    {/* ÉP CỨNG 3 CỘT */}
    <Grid container spacing={3}>
      {companies.map((c) => (
        <Grid key={c.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
          <CardComponent company={c} color={color} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Companies;