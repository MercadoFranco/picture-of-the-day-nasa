import { useParams } from "react-router-dom";
import { useGetDateImage } from "../utils/api";
import dayjs from "dayjs";
import ErrorPage from "../components/ErrorPage";
import NavBar from "../components/NavBar";
import FullPicture from "../components/FullPicture";
import SkeletonPictureDescription from "../components/SkeletonPictureDescription";

const Detail = () => {
  const { date } = useParams();
  const { data, loading, error } = useGetDateImage(date ?? "");

  const dateIsInvalid = !dayjs(date, "YYYY-MM-DD", true).isValid();

  return (
    <>
      <NavBar title={data?.title ?? ""} backButton />
      <main className="w-full flex flex-col flex-grow max-w-7xl px-8 md:px-16 my-8 overflow-auto">
        {dateIsInvalid || error ? (
          <ErrorPage
            errorText={
              dateIsInvalid
                ? `It seems the format of the date is incorrect. \n Try going back to the list and picking a different image.`
                : "An error has occurred when getting the data. Please try again later"
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 flex justify-center items-center">
              {loading ? (
                <div className="w-full h-48 lg:h-1/2 lg:w-3/4 rounded-lg bg-gray-300 animate-pulse" />
              ) : (
                data && <FullPicture item={data} />
              )}
            </div>
            <div className="col-span-1 px-12 py-6 border border-solid border-[#444778] rounded-lg mt-4 lg:mt-0 lg:ml-4">
              {loading ? (
                <SkeletonPictureDescription />
              ) : (
                <>
                  <h2 className="text-lg font-bold font-manrope mb-4 text-white">
                    {dayjs(data?.date).format("MMMM D, YYYY")}
                  </h2>
                  <p className="text-white font-manrope">{data?.explanation}</p>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Detail;
