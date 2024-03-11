import { createContext, useEffect, useState } from "react";
import { PictureItem } from "./types";

type GalleryContextType = {
  favorites: string[];
  addFavorite: (date: string) => void;
  removeFavorite: (date: string) => void;
  allPictures: PictureItem[];
  updateAllPictures: (pictures: PictureItem[]) => void;
  switchFilterByLoved: () => void;
  filterByLoved: boolean;
};

type ProviderType = { children: React.ReactNode };

const defaultValue: GalleryContextType = {
  favorites: [],
  addFavorite: () => null,
  removeFavorite: () => null,
  allPictures: [],
  updateAllPictures: () => null,
  switchFilterByLoved: () => null,
  filterByLoved: false,
};

export const GalleryContext = createContext(defaultValue);

export const GalleryProvider = ({ children }: ProviderType) => {
  const [filterByLoved, setFilterByLoved] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allPictures, setAllPictures] = useState<PictureItem[]>([]);

  useEffect(() => {
    const unparsed = localStorage.getItem("fav_imgs");
    try {
      const parsedFavs = JSON.parse(unparsed ?? "");
      if (parsedFavs?.length) {
        setFavorites(parsedFavs);
      }
    } catch {
      console.log("The favorited data was unable to be parsed");
    }
  }, []);

  const addFavorite = (date: string) => {
    setFavorites((oldFavs) => {
      localStorage.setItem("fav_imgs", JSON.stringify([...oldFavs, date]));
      return [...oldFavs, date];
    });
  };

  const removeFavorite = (date: string) => {
    setFavorites((oldFavs) => {
      const newFavs = oldFavs.filter((storedDate) => storedDate !== date);
      localStorage.setItem("fav_imgs", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const updateAllPictures = (pictures: PictureItem[]) => {
    setAllPictures(pictures);
  };

  const switchFilterByLoved = () => {
    setFilterByLoved((prev) => !prev);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    allPictures,
    setAllPictures,
    updateAllPictures,
    switchFilterByLoved,
    filterByLoved,
  };

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
};

export default GalleryProvider;
