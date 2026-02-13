"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SafeImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
}

const SafeImage = ({
    src,
    alt,
    className,
    fallbackSrc = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
}: SafeImageProps) => {
    const initialSrc = src && src.trim() !== "" ? src : fallbackSrc;
    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [hasError, setHasError] = useState(src && src.trim() !== "" ? false : true);
    const [isLoading, setIsLoading] = useState(src && src.trim() !== "" ? true : false);

    useEffect(() => {
        const currentSrc = src && src.trim() !== "" ? src : fallbackSrc;
        setImgSrc(currentSrc);
        setHasError(src && src.trim() !== "" ? false : true);
        setIsLoading(src && src.trim() !== "" ? true : false);

        if (src && src.trim() !== "") {
            // Fail-safe timeout for slow/hanging images
            const timeout = setTimeout(() => {
                if (isLoading && !hasError) {
                    setImgSrc(fallbackSrc);
                    setHasError(true);
                }
            }, 8000); // 8 second timeout

            return () => clearTimeout(timeout);
        }
    }, [src]);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
                if (!hasError) {
                    setImgSrc(fallbackSrc);
                    setHasError(true);
                    setIsLoading(false);
                }
            }}
        />
    );
};

export default SafeImage;
