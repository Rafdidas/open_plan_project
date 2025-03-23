# OPEN PLAN PROJECT

https://vercel.com/rafdis-projects/open-plan-project-web-v6f7
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## 1. 소개 및 참여인원

- 채용 과제 프로젝트

## 2. 핵심 기능

### turborepo 사용 패키지 매니저 pnpm

### 사진 조회 데이터 Zustand 전역상태 관리

```
import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface PhotoState {
  photoData: {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  } | null;
  setPhotoData: (data: PhotoState["photoData"]) => void;
}

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set) => ({
      photoData: null,
      setPhotoData: (data) => set({ photoData: data }),
    }),
    {
      name: "photo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

```

- photoData : 현재 조회된 사진 정보를 저장하는 상태 객체
- setPhotoData() : 외부에서 상태를 설정하는 함수
- persist() : Zustand 미들웨어. 상태를 localStorage에 자동 저장해서 새로고침 후에도 복원
- name : localStorage에 저장될 키 이름 (photo-storage)

### api 데이터 상태 tanstack-query 사용

```
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

```

- 클라이언트 설정

```
import { useQuery } from "@tanstack/react-query";

const fetchPhoto = async () => {
  const res = await fetch("https://picsum.photos/id/0/info");
  if (!res.ok) {
    throw new Error("사진을 불러오는 데 실패했습니다.");
  }
  return res.json();
};

export const useFetchPhoto = () => {
  return useQuery({
    queryKey: ["photo"],
    queryFn: fetchPhoto,
  });
};

```

- API 요청 코드
- useQuery() : API 호출, 로딩/에러 상태 자동 관리
- queryKey : 요청의 고유 키
- queryFn : 실제 비동기 호출 함수

```
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
  };
```

- 비동기 요청 성공 시 zustand에 저장
