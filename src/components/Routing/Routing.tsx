import { Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import CartPage from "../../Cart/CartPage";
import ProductPage from "../Products/ProductPage";
import MyOrderPage from "../../MyOrder/MyOrderPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<SingleProductPage />} />
      <Route
        path="/myorder"
        element={
          <MyOrderPage
            headings={["Order", "Products", "Total", "Status"]}
            orders={[
              {
                products: ["iPhone 16", "Airpods", "Headphones"],
                status: "shipped",
                total: 12,
              },
            ]}
          />
        }
      />
    </Routes>
  );
};

export default Routing;
