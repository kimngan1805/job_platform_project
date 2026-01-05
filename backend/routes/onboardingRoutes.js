import express from 'express';
import { saveCandidateProfile, saveRecruiterProfile } from '../controllers/onboardingController.js';

const router = express.Router();

router.post('/candidate', saveCandidateProfile);
router.post('/recruiter', saveRecruiterProfile);

export default router;