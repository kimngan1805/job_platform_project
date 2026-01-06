import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip, Tab, Tabs, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack, Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import PlaceIcon from '@mui/icons-material/Place';
import PaymentsIcon from '@mui/icons-material/Payments';

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    // State cho Modal chi tiết và Modal từ chối
    const [openDetail, setOpenDetail] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const fetchJobs = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5050/api/admin/all-jobs');
            const result = await res.json();
            if (result.success) setJobs(result.data);
        } catch (err) { console.error("Lỗi:", err); }
    };

    useEffect(() => { fetchJobs(); }, []);

    // Hàm xử lý Duyệt
    const handleApprove = async (id) => {
        const res = await fetch('http://127.0.0.1:5050/api/admin/approve-job', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if ((await res.json()).success) {
            alert("✅ Đã duyệt bài!");
            setOpenDetail(false);
            fetchJobs();
        }
    };

    // Hàm xử lý Từ chối
    const handleConfirmReject = async () => {
        const res = await fetch('http://127.0.0.1:5050/api/admin/reject-job', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedJob.id, reason: rejectReason })
        });
        if ((await res.json()).success) {
            alert("🚫 Đã từ chối bài!");
            setOpenReject(false);
            setOpenDetail(false);
            setRejectReason("");
            fetchJobs();
        }
    };

    const getStatusChip = (status) => {
        const config = {
            approved: { label: "Đã duyệt", color: "success", bg: "#E6FFFA" },
            pending: { label: "Chờ duyệt", color: "warning", bg: "#FFFBEB" },
            rejected: { label: "Từ chối", color: "error", bg: "#FFF5F5" }
        };
        const s = config[status] || config.pending;
        return <Chip label={s.label} size="small" color={s.color} sx={{ bgcolor: s.bg, fontWeight: 'bold' }} />;
    };

    return (
        <Box m="25px">
            <Typography variant="h4" fontWeight="700" color="#1A202C" mb={1}>QUẢN LÝ TIN TUYỂN DỤNG</Typography>
            <Typography variant="body1" color="#718096" mb={4}>Phê duyệt nội dung tin đăng từ các doanh nghiệp</Typography>

            <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
                <Table>
                    <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '700' }}>Vị trí tuyển dụng</TableCell>
                            <TableCell sx={{ fontWeight: '700' }}>Công ty</TableCell>
                            <TableCell sx={{ fontWeight: '700' }}>Mức lương</TableCell>
                            <TableCell sx={{ fontWeight: '700' }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: '700' }} align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id} hover>
                                <TableCell sx={{ fontWeight: '600', color: '#3B71FE' }}>{job.title}</TableCell>
                                <TableCell>{job.company_name}</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell>{getStatusChip(job.status)}</TableCell>
                                <TableCell align="center">
                                    <Button 
                                        variant="outlined" 
                                        startIcon={<VisibilityIcon />} 
                                        size="small"
                                        onClick={() => { setSelectedJob(job); setOpenDetail(true); }}
                                        sx={{ borderRadius: '8px', textTransform: 'none' }}
                                    >
                                        Xem & Duyệt
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* MODAL CHI TIẾT NỘI DUNG */}
            <Dialog open={openDetail} onClose={() => setOpenDetail(false)} maxWidth="md" fullWidth sx={{ '& .MuiPaper-root': { borderRadius: '20px' } }}>
                {selectedJob && (
                    <>
                        <DialogTitle sx={{ pb: 1 }}>
                            <Typography variant="h5" fontWeight="700" color="#3B71FE">{selectedJob.title}</Typography>
                            <Typography variant="subtitle1" color="#4A5568">{selectedJob.company_name}</Typography>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Grid container spacing={2} mb={3}>
                                <Grid item xs={4}><Stack direction="row" spacing={1}><PaymentsIcon color="disabled" /> <Typography variant="body2"><b>Lương:</b> {selectedJob.salary}</Typography></Stack></Grid>
                                <Grid item xs={4}><Stack direction="row" spacing={1}><PlaceIcon color="disabled" /> <Typography variant="body2"><b>Địa điểm:</b> {selectedJob.location}</Typography></Stack></Grid>
                                <Grid item xs={4}><Stack direction="row" spacing={1}><BusinessIcon color="disabled" /> <Typography variant="body2"><b>Hạn nộp:</b> {new Date(selectedJob.deadline).toLocaleDateString('vi-VN')}</Typography></Stack></Grid>
                            </Grid>
                            <Typography variant="subtitle2" fontWeight="700" gutterBottom>MÔ TẢ CÔNG VIỆC</Typography>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mb: 3, color: '#4A5568' }}>{selectedJob.description}</Typography>
                            <Typography variant="subtitle2" fontWeight="700" gutterBottom>YÊU CẦU ỨNG VIÊN</Typography>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#4A5568' }}>{selectedJob.requirements}</Typography>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, bgcolor: '#F8FAFC' }}>
                            <Button onClick={() => setOpenDetail(false)} sx={{ color: '#718096' }}>Đóng</Button>
                            {selectedJob.status === 'pending' && (
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={() => setOpenReject(true)}>Từ chối</Button>
                                    <Button variant="contained" sx={{ bgcolor: '#10B981' }} startIcon={<CheckCircleIcon />} onClick={() => handleApprove(selectedJob.id)}>Duyệt bài đăng</Button>
                                </Stack>
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* MODAL LÝ DO TỪ CHỐI */}
            <Dialog open={openReject} onClose={() => setOpenReject(false)}>
                <DialogTitle sx={{ fontWeight: '700' }}>Tại sao từ chối bài này?</DialogTitle>
                <DialogContent>
                    <TextField fullWidth multiline rows={3} placeholder="Ghi chú lý do để nhà tuyển dụng sửa đổi..." value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} sx={{ mt: 1 }} />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenReject(false)}>Quay lại</Button>
                    <Button variant="contained" color="error" onClick={handleConfirmReject}>Xác nhận từ chối</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default JobManagement;