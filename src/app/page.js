"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => setProducts(result));
  }, []);

  if (products === null) {
    return <div>იტვირთებაააააა...</div>;
  }

  return (
    <div className={styles.page}>
      {products?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
