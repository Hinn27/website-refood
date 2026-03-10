import { Box } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * AnimatedSection — Component wrapper cho hiệu ứng xuất hiện khi scroll.
 *
 * Variants:
 *   fadeUp    — Mờ dần + trượt lên (mặc định)
 *   fadeDown  — Mờ dần + trượt xuống
 *   fadeLeft  — Mờ dần + trượt từ trái
 *   fadeRight — Mờ dần + trượt từ phải
 *   scale    — Phóng to từ nhỏ
 *   fade     — Chỉ mờ dần
 */

const MotionBox = motion.create(Box);

const animationVariants = {
    fadeUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

function AnimatedSection({
    children,
    variant = "fadeUp",
    delay = 0,
    duration = 0.6,
    once = true,
    threshold = 0.15,
    sx = {},
    ...rest
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        amount: threshold,
    });

    const variants = animationVariants[variant] ?? animationVariants.fadeUp;

    return (
        <MotionBox
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easeOut
            }}
            sx={sx}
            {...rest}
        >
            {children}
        </MotionBox>
    );
}

// Stagger container — dùng cho danh sách items
const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export { MotionBox, staggerContainer, staggerItem };
export default AnimatedSection;
