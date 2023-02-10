import { useEffect, useState } from "react"

export const useScroll = () => {
  const [myScrollTop, setMyScrollTop] = useState(0);
  useEffect(() => {
    console.log(11111111);
    window.addEventListener('scroll', () => {
      setMyScrollTop(window.scrollY);
    });
    console.log(myScrollTop);
  }, [myScrollTop]);
  return { myScrollTop };
}