import { decreaseQuantity, increaseQuantity } from "../services/cartServices";

interface QuantityInputProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  stock: number;
  productId: string;
  isCartPage: boolean;
}

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  productId,
  isCartPage,
}: QuantityInputProps) => {
  const handleIncrease = async () => {
    if (isCartPage) {
      try {
        const res = await increaseQuantity(productId);

        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }

    setQuantity(quantity + 1);
  };
  const handleDecrease = async () => {
    if (isCartPage) {
      try {
        const res = decreaseQuantity(productId);

        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }

    setQuantity(quantity - 1);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          disabled={quantity === 1}
          className={`bg-red-600 w-8 h-8 text-white text-2xl rounded-full ${
            quantity === 1 ? "opacity-70" : ""
          }`}
          onClick={handleDecrease}
        >
          -
        </button>
        <p className="mx-5 w-5 text-center">{quantity}</p>
        <button
          disabled={quantity === stock}
          className={`bg-green-600 w-8 h-8 text-white text-2xl rounded-full ${
            quantity === stock ? "opacity-70" : ""
          }`}
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantityInput;
