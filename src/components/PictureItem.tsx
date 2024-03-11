import { Link } from "react-router-dom";
import { PictureItem as PictureItemType } from "../utils/types";
import { HeartIcon, PlayIcon } from "@heroicons/react/16/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { MouseEvent, useContext } from "react";
import { GalleryContext } from "../utils/context";
import ShareButton from "./ShareButton";

type PictureItemProps = {
  item: PictureItemType;
};

const PictureItem = ({ item }: PictureItemProps) => {
  const { favorites, addFavorite, removeFavorite } = useContext(GalleryContext);

  const videoId =
    item.media_type === "video"
      ? item.url.split("embed/")[1]?.split("?rel")?.[0] ?? ""
      : "";
  const imgUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/0.jpg`
    : item.url;
  // Sometimes the picture of the day is a video, so in those cases we'll take the thumbnail from Youtube

  const isFavorited = favorites.includes(item.date);

  const handleHeart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFavorited) {
      removeFavorite(item.date);
    } else {
      addFavorite(item.date);
    }
  };

  return (
    <Link to={`/${item.date}`}>
      <article className="rounded-2xl w-full h-72  transition-all transform hover:scale-110 cursor-pointer relative overflow-hidden p-1 border border-solid border-primaryLight hover:border-white">
        <div className="z-10 p-4 absolute bg-gradient-to-t from-black to-blackLowOpacity hover:to-transparent w-full h-full flex items-end gap-x-4">
          <section className="flex flex-col flex-1">
            <h4 className="text-white text-base font-manrope">
              {" "}
              {item.title}{" "}
            </h4>
            <p className="text-gray-400 text-sm font-roboto"> {item.date} </p>
          </section>
          <section className="flex flex-col self-end gap-y-4 my-6">
            <button
              onClick={handleHeart}
              className="hover:scale-110 active:scale-125 transition-all"
            >
              {isFavorited ? (
                <HeartIcon className="w-8 h-8 text-red-700" />
              ) : (
                <HeartIconOutline className="w-8 h-8 text-red-700" />
              )}
            </button>
            <ShareButton date={item.date} />
          </section>
          {videoId && (
            <PlayIcon className="h-14 w-14 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
        <img
          src={imgUrl}
          className="w-full h-full object-cover z-0 rounded-2xl"
          alt={`Image from day ${item.date}`}
        />
      </article>
    </Link>
  );
};

export default PictureItem;
