import { Box } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { animationVariants } from "../../utils/animations";
import PropTypes from "prop-types";

const MotionBox = motion.create(Box);

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

AnimatedSection.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    delay: PropTypes.number,
    duration: PropTypes.number,
    once: PropTypes.bool,
    threshold: PropTypes.number,
    sx: PropTypes.object,
};

export { MotionBox };
export default AnimatedSection;
