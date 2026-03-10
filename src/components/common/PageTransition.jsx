import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const MotionBox = motion.create(Box);

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -12,
    },
};

const pageTransition = {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1],
};

function PageTransition({ children }) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <MotionBox
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                sx={{ width: "100%" }}
            >
                {children}
            </MotionBox>
        </AnimatePresence>
    );
}

export default PageTransition;
