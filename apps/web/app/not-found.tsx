import Button from "@repo/ui/button";
import style from "./styles/notFound.module.css";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <div className={style.empty}>
        <p>404 - 페이지를 찾을 수 없습니다.</p>
        <Link href="/">
          <Button className={style.back_btn}>메인으로 이동</Button>
        </Link>
      </div>
    </>
  );
}
