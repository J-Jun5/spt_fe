import React from "react";
import { useState } from "react";
import styles from "./Default.module.css";

//렌더링 컴포넌트
import PageNav from "../components/PageNav.js";
import SellingProductHeader from "../components/SellingProductHeader.js";
import SellingProductRender from "components/SellingProductRender";
import ProductRenderPerRow from "components/renderData/ProductRenderPerRow";
import Pagenation from "components/Pagenation"

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useWindowWidhtSize from "../hooks/useWindowWidhtSize.js";

function Hompage() {
  const [ProductSortOption, setProductSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 커스텀 훅
  const {
    bestProductCount,
    sellingProductCount,
    sellingProductCountPerRow,
    device,
  } = useWindowWidhtSize();

  const { productsList: bestProductData, noProduct: bestNoProduct } =
    useProductData(1, bestProductCount, "favorite", "");

  const {
    productsList: sellingProductData,
    noProduct: sellingNoProduct,
    nowPage,
    totalPageSize,
    handlePageChange,
  } = useProductData(1, sellingProductCount, ProductSortOption, searchKeyword);

  // 검색어 핸들러
  const handleSeachKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSortOption = (option) => {
    setProductSortOption(option);
  };

  return (
    <div className={styles.bgSet}>
      <nav className={styles.navSet}>
        <PageNav />
      </nav>
      <main className={styles.mainContainer}>
        <section className={styles.bestSection}>
          <header className={styles.headerText}>베스트 상품</header>
          <ProductRenderPerRow productList={bestProductData} />
        </section>
        <section className={styles.SellingSection}>
          <SellingProductHeader text={"판매 중인 상품"} deviceType={device}/>
          <SellingProductRender productData={sellingProductData} />
        </section>
      </main>
      <footer>
        <Pagenation
          nowPage={nowPage}
          handlePageChange={handlePageChange}
          totalPageSize={totalPageSize}
        />
      </footer>
    </div>
  );
}

export default Hompage;
