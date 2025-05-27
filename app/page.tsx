
import TopBar from "./components/organisms/top-bar";
import ProductList from "./components/organisms/product-list"

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <TopBar></TopBar>
      <ProductList></ProductList>
    </main>
  );
}
