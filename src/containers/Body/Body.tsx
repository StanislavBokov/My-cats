import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {  upDateCats, fetchNextPage } from "../../store/cats/reducer";
import { fetchCatsAction } from "../../store/cats/actions.";
import { CatsItem } from "../../types";
import { HeartSvg } from "./componets";
import styles from './styles.module.scss';


export const Body: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
   
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollHandler = (e:any) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      dispatch(fetchNextPage(true));
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
  }, []);
  
  const { cats, isFavoritePage, loading, loadingNextPage, error } = useSelector((state:RootStateOrAny) => state.cats);
  
  useEffect(() => {
    dispatch(fetchCatsAction(currentPage));
    setCurrentPage(currentPage + 1);
  }, [loadingNextPage]);
    
  const handleClickImg = (id: string) => {
    dispatch(upDateCats(id));
  };
    
  const isFavoriteCats = () => {
    if(cats) {
      return isFavoritePage ? cats.filter((cat: CatsItem) => cat.favorities === true) : cats;
    }
  };
  if(error.error) {
    return <h1>{error.errorMessage}</h1>;
  }
  return (
    <>
      <div className={styles.MainPage}>
        {loading && <h1>Loading...</h1>}
        {cats && isFavoriteCats().map((cat: CatsItem) => (
          <div 
            key={cat.id} 
            className={styles.catWrap} 
            style={{ backgroundImage: `url(${cat.url})` }}
          >
            <HeartSvg 
              isFavorites={cat.favorities} 
              className={styles.opacityHeart} 
              onClick={handleClickImg} 
              id={cat.id}/>
          </div> 
        ))} 
        {cats && !isFavoriteCats().length && !loading && <h3>Добавте котиков в избранное</h3>}
      </div>
      {loadingNextPage && <div className={styles.loader}>... загружаем еще котиков ...</div>}
    </>
  );
};