import ProductCard from "./ProductCard";
import iphone from "../../assets/images/iphone-16-pro.webp";

const ProductList = () => {
  return (
    <section className="bg-[#f6f8fa] p-2">
      <header className="flex items-center justify-between gap-x-2 mb-5">
        <h1>Products</h1>
        <select
          name="sort"
          id=""
          className="outline-none rounded-md text-sm border-none shadow"
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH </option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH </option>
        </select>
      </header>
      <div className="flex justify-evenly flex-wrap gap-3">
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price="$1,854"
          image={iphone}
          link="/"
        />
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price="$1,854"
          image={iphone}
          link="/"
        />
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price="$1,854"
          image={iphone}
          link="/"
        />
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price="$1,854"
          image={iphone}
          link="/"
        />
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price="$1,854"
          image={iphone}
          link="/"
        />
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price="$1,854"
          image={iphone}
          link="/"
        />
      </div>
    </section>
  );
};

export default ProductList;
