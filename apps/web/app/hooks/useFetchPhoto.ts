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
