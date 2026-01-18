'use client';

import s from './SearchForm.module.css';
import { type FC, type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const SearchForm: FC = () => {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            router.push(`/movies?query=${encodeURIComponent(inputValue)}`);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={s.searchBox}>
            <input
                type="text"
                className={s.searchInput}
                placeholder="Search movies..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className={s.searchBtn}>
                <span role="img" aria-label="search">🔍</span>
            </button>
        </form>
    );
};