import React from "react";
import { useState } from "react";
import styles from "./Homepage.module.css";

//렌더링 컴포넌트
import PageNav from "../components/PageNav.js"
import SellingProductHeader from "../components/SellingProductHeader.js";
import SellingProductRender from "components/SellingProductRender";

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
        <SellingProductHeader text={"판매 중인 상품"}/>
        <SellingProductRender
          productData={sellingProductData}
          productRowCount={2}
          productCountPerRow={sellingProductCountPerRow}
          noProduct={sellingNoProduct}
        />
      </main>
      
    </div>
  );
}

export default Hompage;
