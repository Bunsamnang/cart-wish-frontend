import ProductList from "./ProductList";
import ProductSidebar from "./ProductSidebar";

const ProductPage = () => {
  return (
    <section className="grid grid-cols-1  md:grid-cols-[1fr_4fr] mt-20">
      <ProductSidebar />

      <ProductList />
    </section>
  );
};

export default ProductPage;
