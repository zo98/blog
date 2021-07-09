import { useEffect } from "react";

export default function AutoRem(props) {
  const resize = (time) => {
    let timer = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const root = document.documentElement;
        const screen = document.body.clientWidth;
        root.style.fontSize = `${screen * (16 / 1292)}px`;
        timer = null;
      }, time);
    };
  };

  useEffect(() => {
    const root = document.documentElement;
    const screen = document.body.clientWidth;
    root.style.fontSize = `${screen * (16 / 1292)}px`;
    window.addEventListener("resize", resize(10)), [];
  });
}
