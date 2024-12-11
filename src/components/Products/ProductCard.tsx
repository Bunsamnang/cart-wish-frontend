import { Card } from "flowbite-react";
import { ShoppingBasket, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  imageAlt: string;
  price: string;
  rating: string;
  numRating: number;
  name: string;
  link: string;
}

const ProductCard = ({
  image,
  imageAlt,
  price,
  rating,
  numRating,
  name,
  link,
}: ProductCardProps) => {
  return (
    <Card
      imgSrc={image}
      imgAlt={imageAlt}
      href={link}
      className="max-w-xs hover:!shadow-sm transition-shadow duration-300 ease-in"
    >
      <hr className="border-t border-slate-500  w-full " />
      <h1 className="font-bold text-lg">{price}</h1>
      <p className="text-slate-600">{name}</p>
      <footer className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          <p className="flex justify-center items-center gap-2 text-white font-semibold bg-orange-500 px-3 py-1 rounded-md">
            <Star size={20} fill="white" /> {rating}
          </p>

          <p className="text-slate-400">| ({numRating})</p>
        </div>
        <button>
          <ShoppingBasket
            className="text-white bg-slate-900 rounded-full p-2 hover:scale-110 transition-all 0.3s ease-in"
            size={40}
          />
        </button>
      </footer>
    </Card>
  );
};

export default ProductCard;
