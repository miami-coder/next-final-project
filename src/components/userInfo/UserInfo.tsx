import { FC } from "react";
import s from "./UserInfo.module.css";

export const UserInfo: FC = () => {
    return (
        <div className={s.userWrapper}>
            <div className={s.avatarCircle}>B</div>
            <span className={s.name}>Bohdan Palamarchuk</span>
        </div>
    );
};