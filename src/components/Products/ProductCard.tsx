import { Card } from "flowbite-react";
import { ShoppingBasket, Star } from "lucide-react";
import { Product } from "../../hooks/useData";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { _id, images, title, price, stock, reviews } = product;

  const { addToCart } = useCart();
  return (
    <Card href={`/products/${_id}`} className="flex-1 max-w-sm">
      <div className="relative overflow-hidden rounded-t-lg ">
        {/* Set fixed dimensions and use object-cover */}
        <img
          src={`http://localhost:5000/products/${images[0]}`}
          alt={`${title} image`}
          className="w-full h-full object-contain aspect-[16/9]"
        />
      </div>
      <hr className="border-t border-slate-500  w-full " />
      <h1 className="font-bold text-lg">${price}</h1>
      <p className="text-slate-600">{title}</p>
      <footer className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          <p className="flex justify-center items-center gap-2 text-white font-semibold bg-orange-500 px-3 py-1 rounded-md">
            <Star size={20} fill="white" /> {reviews.rate}
          </p>

          <p className="text-slate-400 whitespace-nowrap">
            | ({reviews.counts})
          </p>
        </div>
        {stock > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
          >
            <ShoppingBasket
              className="text-white bg-slate-900 rounded-full p-2 hover:scale-110 transition-all 0.3s ease-in"
              size={40}
            />
          </button>
        )}
      </footer>
    </Card>
  );
};

export default ProductCard;
