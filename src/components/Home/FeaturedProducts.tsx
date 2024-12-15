import ProductCard from "../Products/ProductCard";
import iphone from "../../assets/images/iphone.jpg";
const FeaturedProducts = () => {
  return (
    <section className="my-14">
      <h1 className="text-3xl font-bold text-center mb-16">
        Featured Products
      </h1>
      <div className="flex justify-evenly max-sm:flex-col max-sm:items-center gap-5">
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price={1854}
          image={iphone}
          link="/"
          stock={1}
        />
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price={1854}
          image={iphone}
          link="/"
          stock={1}
        />
        <ProductCard
          name="iPhone 16 Pro"
          imageAlt="iphone 16 pro image"
          numRating={120}
          rating="5.0"
          price={1854}
          image={iphone}
          link="/"
          stock={1}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
