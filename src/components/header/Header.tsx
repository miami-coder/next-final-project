import Link from "next/link";
import s from "./Header.module.css";
import { genreService } from "@/services/api.service";
import {SearchForm} from "@/components/searchForm/SearchForm";
import {UserInfo} from "@/components/userInfo/UserInfo";

const Header = async () => {
    const { genres } = await genreService.getAll();

    return (
        <header className={s.header}>
            <div className={s.logo}>
                <Link href="/">Mini-Netflix</Link>
            </div>

            <nav className={s.nav}>
                <Link href="/movies">All Movies</Link>

                <div className={s.genresDropdown}>
                    <span>Genres ▾</span>
                    <div className={s.dropdownContent}>
                        {genres.map(genre => (
                            <Link key={genre.id} href={`/movies?with_genres=${genre.id}`}>
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <div className={s.rightSection}>
                <SearchForm />
                <UserInfo />
            </div>
        </header>
    );
};

export default Header;