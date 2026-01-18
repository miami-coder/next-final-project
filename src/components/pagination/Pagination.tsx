'use client';

import s from './Pagination.module.css';
import type { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    totalPages: number;
}

export const Pagination: FC<Props> = ({ totalPages }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `/movies?${params.toString()}`;
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            router.push(createPageUrl(newPage));
        }
    };

    const safeTotalPages = Math.min(totalPages, 500);

    return (
        <div className={s.pagination}>
            <button
                className={s.pageBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt; Prev
            </button>

            <div className={s.pageInfo}>
                Page <span>{currentPage}</span> of {safeTotalPages}
            </div>

            <button
                className={s.pageBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === safeTotalPages}
            >
                Next &gt;
            </button>
        </div>
    );
};