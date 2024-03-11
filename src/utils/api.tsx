import env from "./env";
import { useState, useEffect, useContext } from "react";
import { PictureItem as PictureItemType } from "./types";
import dayjs from "dayjs";
import { GalleryContext } from "./context";
import axios from "axios";

const useGetLastMonthImages = () => {
  const { allPictures, updateAllPictures } = useContext(GalleryContext);
  const [data, setData] = useState<PictureItemType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getImages = async (today: string, aMonthAgo: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${env.API_KEY}&start_date=${aMonthAgo}&end_date=${today}`
      );
      let responseData = response?.data;
      if (responseData.length) {
        responseData = responseData.sort(
          (picA: PictureItemType, picB: PictureItemType) =>
            new Date(picB.date).getTime() - new Date(picA.date).getTime()
        );
        setData(responseData);
        updateAllPictures(responseData);
        setLoading(false);
      } else if (responseData?.error) {
        setLoading(false);
        setError(responseData.error.message ?? "Error");
      }
    } catch (err) {
      console.log("Error fetching: ", err);
      setError("Error while fetching");
      setData([]);
    }
  };

  useEffect(() => {
    if (!allPictures?.length) {
      const today = dayjs().format("YYYY-MM-DD").toString();
      const aMonthAgo = dayjs()
        .subtract(1, "month")
        .format("YYYY-MM-DD")
        .toString();

      getImages(today, aMonthAgo);
    } else {
      setData(allPictures);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
};

const useGetDateImage = (date: string) => {
  const { allPictures } = useContext(GalleryContext);
  const [data, setData] = useState<PictureItemType | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getImage = async (date: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${env.API_KEY}&date=${date}`
      );
      const responseData = response?.data;
      if (responseData) {
        setData(responseData);
        setLoading(false);
      } else if (responseData?.error) {
        setLoading(false);
        setError(responseData.error.message ?? "Error");
      }
    } catch (err) {
      console.log("Error fetching: ", err);
      setError("Error while fetching");
      setData(null);
    }
  };

  useEffect(() => {
    const pictureInCache = allPictures.find(
      (pic: PictureItemType) => pic.date === date
    );
    if (pictureInCache) {
      setData(pictureInCache);
    } else if (date) getImage(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
};

export { useGetLastMonthImages, useGetDateImage };
