import { CardMedia, Skeleton } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

/**
 * CardMediaSkeleton — CardMedia with a Skeleton placeholder while loading.
 *
 * Props: same as CardMedia + `skeletonHeight` (optional).
 */
function CardMediaSkeleton({ sx, skeletonHeight, ...props }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && (
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                        width: "100%",
                        height: skeletonHeight,
                        aspectRatio: skeletonHeight ? undefined : sx?.aspectRatio || "16/10",
                    }}
                />
            )}
            <CardMedia
                {...props}
                sx={{
                    ...sx,
                    display: loaded ? "block" : "none",
                }}
                onLoad={() => setLoaded(true)}
            />
        </>
    );
}

CardMediaSkeleton.propTypes = {
    sx: PropTypes.object,
    skeletonHeight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    // cac prop khac se duoc Media nhan, nen khong can khai bao them
};

export default CardMediaSkeleton;
