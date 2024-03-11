import { PictureItem } from "../utils/types";

type FullPictureProps = {
  item: PictureItem;
};

const FullPicture = ({ item }: FullPictureProps) => {
  return (
    <>
      {item?.media_type == "video" ? (
        <div className="w-full h-0 relative pt-[56.25%] rounded-lg overflow-hidden border border-solid border-primaryLight">
          <iframe
            className="w-full h-full absolute top-0 left-0 p-1 border-0 rounded-lg"
            src={item.url}
          />
        </div>
      ) : (
        <a href={item?.hdurl} target="_blank">
          <img
            className="rounded-lg lg:max-h-[calc(100vh-11.5rem)] border border-solid border-primaryLight p-1"
            src={item?.url}
            alt={item?.title}
          />
        </a>
      )}
    </>
  );
};

export default FullPicture;
