import s from "./PosterPreview.module.css";
import type { FC } from "react";
import Image from "next/image";

interface IProps {
    path: string | null;
    title: string;
}

export const PosterPreview: FC<IProps> = ({ path, title }) => {
    const imageUrl = path
        ? `https://image.tmdb.org/t/p/original${path}`
        : "https://via.placeholder.com/1920x1080?text=No+Preview+Available";

    return (
        <div className={s.posterContainer}>
            <Image
                src={imageUrl}
                alt={title}
                fill
                className={s.image}
                priority
                unoptimized={!path}
            />
            <div className={s.gradientOverlay} />
        </div>
    );
};