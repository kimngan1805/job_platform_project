import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, Building2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const isAuthenticated = true;
    const user = { fullName: "Alex", role: "employer" };
    const navigate = useNavigate();

    const stats = [
        { icon: Users, label: 'Active Users', value: '2.4M+' },
        { icon: Building2, label: 'Companies', value: '50K+' },
        { icon: TrendingUp, label: 'Jobs Posted', value: '150K+' },
    ];

    return (
        <section className="">
            <div className="">
                <div className="">
                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        cla
                    >
                    </motion.h1>
                </div>
            </div>
        </section>
    );
};

export default Hero;