import { useEffect, useState } from "react"

export const useScroll = () => {
  const [myScrollTop, setMyScrollTop] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setMyScrollTop(window.scrollY);
    });
  }, [myScrollTop]);
  return { myScrollTop };
}