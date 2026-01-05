import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import các routes
import authRoutes from './routes/authRoutes.js';
import onboardingRoutes from './routes/onboardingRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- SỬ DỤNG ROUTES ---
// API Auth: /api/register, /api/login
app.use('/api', authRoutes);

// API Onboarding: /api/onboarding/candidate...
app.use('/api/onboarding', onboardingRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('API đang chạy ngon lành cành đào! 🚀');
});

// Chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});