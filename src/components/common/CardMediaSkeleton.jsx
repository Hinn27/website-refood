import { CardMedia, Skeleton } from "@mui/material";
import { useState } from "react";

/**
 * CardMediaSkeleton — CardMedia with a Skeleton placeholder while loading.
 *
 * Props: same as CardMedia + `skeletonHeight` (optional).
 */
function CardMediaSkeleton({ sx, ...props }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && (
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                        aspectRatio: sx?.aspectRatio || "16/10",
                        width: "100%",
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

export default CardMediaSkeleton;
