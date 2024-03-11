import { useContext, useMemo } from "react";
import ErrorPage from "../components/ErrorPage";
import FloatingMenu from "../components/FloatingMenu";
import NavBar from "../components/NavBar";
import PictureItem from "../components/PictureItem";
import SkeletonPictureItem from "../components/SkeletonPictureItem";
import { useGetLastMonthImages } from "../utils/api";
import { GalleryContext } from "../utils/context";
import { PictureItem as PictureItemType } from "../utils/types";

const Home = () => {
  const { filterByLoved, favorites } = useContext(GalleryContext);
  const { data, loading, error } = useGetLastMonthImages();

  const skelArray = Array.from(Array(12).keys());

  const pictures = useMemo(() => {
    if (filterByLoved) {
      return data.filter((picture: PictureItemType) =>
        favorites.includes(picture.date)
      );
    } else {
      return data;
    }
  }, [filterByLoved, favorites, data]);

  if (error !== "") return <ErrorPage />;

  return (
    <>
      <NavBar />
      <main className="w-full max-w-7xl px-8 md:px-16 my-12">
        <FloatingMenu />
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? skelArray.map((item) => (
                <li key={item}>
                  <SkeletonPictureItem />
                </li>
              ))
            : pictures.map((item) => (
                <li key={item.date}>
                  <PictureItem item={item} />
                </li>
              ))}
        </ol>
        {pictures.length === 0 && !loading && (
          <ErrorPage
            errorText={`${
              filterByLoved
                ? "No pictures, try adding some pictures to favorites first."
                : "Try again later."
            }`}
          />
        )}
      </main>
    </>
  );
};

export default Home;
