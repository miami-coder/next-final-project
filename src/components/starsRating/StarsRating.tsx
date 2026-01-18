import { FC } from "react";
import s from "./StarsRating.module.css";

interface IProps {
    rating: number;
}

export const StarsRating: FC<IProps> = ({ rating }) => {
    const starsValue = rating / 2;

    return (
        <div className={s.starsWrapper}>
            <div className={s.starsContainer}>
                {[1, 2, 3, 4, 5].map((index) => {
                    const fill = Math.max(0, Math.min(100, (starsValue - index + 1) * 100));

                    return (
                        <div key={index} className={s.starOutline}>
                            <div
                                className={s.starFilled}
                                style={{ width: `${fill}%` }}
                            >
                                ★
                            </div>
                            <span className={s.starBase}>★</span>
                        </div>
                    );
                })}
            </div>
            <span className={s.ratingNumber}>{rating.toFixed(1)}</span>
        </div>
    );
};