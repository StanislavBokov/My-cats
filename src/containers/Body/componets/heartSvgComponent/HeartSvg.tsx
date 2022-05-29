import React, { FC } from "react";
import cn from 'clsx';
import styles from './styles.module.scss';

interface IHeartSvgProps {
  isFavorites: boolean;
  className: string;
  id: string;
  onClick: (id: string) => void

} 

export const HeartSvg:FC<IHeartSvgProps> = ({ className, isFavorites, id, onClick }) => {
  return (
    <svg width="40" height="40" viewBox="-5 0 55 50" fill="none" strokeWidth="5px" xmlns="http://www.w3.org/2000/svg"
      className={cn(className, styles.heartIcon, { [styles.fillIcon]: isFavorites })} 
      onClick={() => onClick(id)}
    >
      <path d="M20 36.7L17.1 34.06C6.8 24.72 0 18.56 0 11C0 4.84 4.84 0 11 0C14.48 0 17.82 1.62 20 4.18C22.18 1.62 25.52 0 29 0C35.16 0 40 4.84 40 11C40 18.56 33.2 24.72 22.9 34.08L20 36.7Z" 
        fill="none"
      />
    </svg>
  );
};