import HeroSection from "./HeroSection";
import iphone from "../../assets/images/iphone-14-pro.webp";
import mac from "../../assets/images/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";
const HomePage = () => {
  return (
    <div>
      <HeroSection
        image={iphone}
        title="Buy iPhone 14 Pro"
        subTitle="Experience the power of the lates iPhone 16 with our most Pro camera ever."
        link="/products/675ae6685bb9cedb24a65727"
      />

      <FeaturedProducts />
      <HeroSection
        image={mac}
        title="Transform Your Workspace with the Ultimate Mac Setup"
        subTitle="Elevate your productivity and creativity with a sleek, powerful Mac ecosystem."
        link="/products?category=Laptops"
      />
    </div>
  );
};

export default HomePage;
