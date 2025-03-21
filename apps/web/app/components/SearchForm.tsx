"use client";

import { useRouter } from "next/navigation";
import { useFetchPhoto } from "../hooks/useFetchPhoto";
import { usePhotoStore } from "../../store";

import Button from "@repo/ui/button";

import style from "../styles/main.module.css";
import { useRef, useState } from "react";

export default function SearchForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isLoading, error } = useFetchPhoto();
  const setPhotoData = usePhotoStore((state) => state.setPhotoData);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    if (!data) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setLoading(true);

    debounceRef.current = setTimeout(() => {
      setPhotoData(data);
      router.push("/result");
      setLoading(false);
    }, 1000);
    // if (data) {
    //   setPhotoData(data);
    //   router.push("/result");
    // }
  };
  if (isLoading) return <p className={style.empty}>Loading...</p>;
  if (error) return <p className={style.empty}>에러 발생</p>;

  return (
    <section className={style.main}>
      <div className={style.inner}>
        <p className={style.text_section}>
          안녕하세요
          <br />
          박현규입니다.
        </p>
      </div>
      <Button className={style.main_btn} onClick={handleClick} disabled={!data}>
        다음
        {loading && <span className={style.spinner} />}
      </Button>
    </section>
  );
}
