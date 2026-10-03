"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("პროდუქტების ჩატვირთვა ვერ მოხერხდა.");
        }

        return response.json();
      })
      .then((result) => setProducts(result.slice(0, 20)))
      .catch(() => setError("პროდუქტების ჩატვირთვა ვერ მოხერხდა."))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>FAKE STORE API</p>
            <h1>პროდუქტები</h1>
          </div>
          {!isLoading && !error && (
            <p className={styles.count}>{products.length} პროდუქტი</p>
          )}
        </header>

        {isLoading ? (
          <p className={styles.message}>პროდუქტები იტვირთება...</p>
        ) : error ? (
          <p className={styles.message} role="alert">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className={styles.message}>პროდუქტები სიაში აღარ არის.</p>
        ) : (
          <ul className={styles.productList}>
            {products.map((product) => (
              <li className={styles.product} key={product.id}>
                <div className={styles.imageFrame}>
                  <img
                    className={styles.image}
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.category}>{product.category}</p>
                  <h2 className={styles.productTitle}>{product.title}</h2>
                  <div className={styles.productFooter}>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                    <button
                      className={styles.deleteButton}
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      aria-label={`${product.title} - წაშლა`}
                    >
                      წაშლა
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
