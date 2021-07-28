import { useState } from "react";

export default function pages() {
  const [pages, setPages] = useState({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  });

  return [pages, setPages];
}
