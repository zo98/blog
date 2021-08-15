import { useEffect } from "react";

export default function AutoRem(props) {
  const core = () => {
    const root = document.documentElement;
    const screen = document.body.clientWidth;
    let fontSize = screen * (16 / 1292);
    if (fontSize < 12) {
      fontSize = 12;
    }
    if (fontSize > 24) {
      fontSize = 24;
    }
    root.style.fontSize = `${fontSize}px`;
  };
  const resize = (time) => {
    let timer = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        core();
        timer = null;
      }, time);
    };
  };

  useEffect(() => {
    core();
    window.addEventListener("resize", resize(10)), [];
  });
}
