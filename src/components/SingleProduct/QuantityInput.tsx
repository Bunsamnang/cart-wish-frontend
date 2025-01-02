import { decreaseQuantity, increaseQuantity } from "../services/cartServices";

interface QuantityInputProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  stock: number;
  productId: string;
}

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  productId,
}: QuantityInputProps) => {
  const handleIncrease = async (productId: string) => {
    try {
      const res = await increaseQuantity(productId);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDecrease = async (productId: string) => {
    try {
      const res = decreaseQuantity(productId);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          disabled={quantity === 1}
          className={`bg-red-600 w-8 h-8 text-white text-2xl rounded-full ${
            quantity === 1 ? "opacity-70" : ""
          }`}
          onClick={() => {
            setQuantity(quantity - 1);
            handleDecrease(productId);
          }}
        >
          -
        </button>
        <p className="mx-5 w-5 text-center">{quantity}</p>
        <button
          disabled={quantity === stock}
          className={`bg-green-600 w-8 h-8 text-white text-2xl rounded-full ${
            quantity === stock ? "opacity-70" : ""
          }`}
          onClick={() => {
            setQuantity(quantity + 1);
            handleIncrease(productId);
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantityInput;
