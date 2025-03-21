"use client";

import { usePhotoStore } from "../../store";
import Image from "next/image";
import Button from "@repo/ui/button";

import style from "../styles/result.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultDisplay() {
  const photoData = usePhotoStore((state) => state.photoData);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!photoData) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [photoData, router]);

  if (!photoData) {
    return <p className={style.empty}>데이터가 없습니다.</p>;
  }

  return (
    <section className={style.result_page}>
      <div
        className={style.background_overlay}
        style={{ backgroundImage: `url(${photoData.download_url})` }}
      />
      <div className={style.inner}>
        <div className={style.image_section}>
          <Image
            src={photoData.download_url}
            width={photoData.width}
            height={photoData.height}
            alt={photoData.author}
          />
        </div>
        <div className={style.info_section}>
          {showContent ? (
            <>
              <div className={style.info_box}>
                <div className={style.section_box}>
                  <p className={style.title}>id</p>
                  <p className={style.data}>{photoData.id}</p>
                </div>
                <div className={style.section_box}>
                  <p className={style.title}>author</p>
                  <p className={style.data}>{photoData.author}</p>
                </div>
              </div>
              <div className={style.info_box}>
                <div className={style.section_box}>
                  <p className={style.title}>width</p>
                  <p className={style.data}>{photoData.width}</p>
                </div>
                <div className={style.section_box}>
                  <p className={style.title}>height</p>
                  <p className={style.data}>{photoData.height}</p>
                </div>
              </div>
              <div className={`${style.info_box} ${style.info_box_last}`}>
                <div className={style.section_box}>
                  <p className={style.title}>url</p>
                  <a
                    className={style.data}
                    href={photoData.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {photoData.url}
                  </a>
                </div>
                <div className={style.section_box}>
                  <p className={style.title}>download_url</p>
                  <a
                    className={style.data}
                    href={photoData.download_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {photoData.download_url}
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={style.skeleton_info}>
                  <span className={style.spinner} />
                </div>
              ))}
            </>
          )}
          <Button
            className={style.back_btn}
            onClick={() => window.history.back()}
          >
            이전
          </Button>
        </div>
      </div>
    </section>
  );
}
