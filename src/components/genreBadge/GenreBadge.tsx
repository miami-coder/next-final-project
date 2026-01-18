import s from './GenreBadge.module.css';
import type { FC } from "react";
import Link from "next/link";

interface IProps {
    id: number;
    name: string;
}

export const GenreBadge: FC<IProps> = ({ id, name }) => {
    return (
        <Link href={`/movies?with_genres=${id}`} className={s.badge}>
            {name}
        </Link>
    );
};