import { useState, useEffect } from "react";
import { url } from "./getApiUrl";

export type TApiResponse = {
  amountInterval: {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };
  termInterval: {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };
};

export const useApi = () => {
  const [intervals, setIntervals] = useState<TApiResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const getApiData = async () => {
    setLoading(true);
    try {
      const apiRes = await fetch(`${url}/intervals`);
      const json = await apiRes.json();
      setIntervals(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    getApiData();
  }, []);

  return { intervals, loading };
};
