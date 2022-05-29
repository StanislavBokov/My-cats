import React, { FC } from "react";
import styles from './styles.module.scss';
import { useDispatch } from "react-redux";
import { setFavoritesCats } from "../../store/cats/reducer";

export const Header:FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.Header}>
      <div className={styles.mainWrapper}>
        <nav>
          <ul className={styles.list}>
            <li onClick={() => dispatch(setFavoritesCats(false))}>Все котики</li>
            <li onClick={() => dispatch(setFavoritesCats(true))}>Любимые котики</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};