"use client";

import { useRouter } from "next/navigation";
import SearchForm from "./components/SearchForm";
import { usePhotoStore } from "../store";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const photoData = usePhotoStore((state) => state.photoData);

  useEffect(() => {
    if (photoData) {
      router.push("/result");
    }
  }, [photoData, router]);
  return <SearchForm />;
};

export default Home;
