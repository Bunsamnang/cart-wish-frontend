import ProductList from "./ProductList";
import ProductSidebar from "./ProductSidebar";

const ProductPage = () => {
  return (
    <section className="grid grid-cols-[1fr_4fr]">
      <ProductSidebar />

      <ProductList />
    </section>
  );
};

export default ProductPage;
