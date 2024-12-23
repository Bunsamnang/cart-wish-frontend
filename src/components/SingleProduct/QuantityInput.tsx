interface QuantityInputProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  stock: number;
}

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
}: QuantityInputProps) => {
  return (
    <>
      <button
        disabled={quantity === 1}
        className={`bg-red-600 w-8 h-8 text-white text-2xl rounded-full ${
          quantity === 1 ? "opacity-70" : ""
        }`}
        onClick={() => setQuantity(quantity - 1)}
      >
        -
      </button>
      <p className="mx-5 w-5">{quantity}</p>
      <button
        disabled={quantity === stock}
        className={`bg-green-600 w-8 h-8 text-white text-2xl rounded-full ${
          quantity === stock ? "opacity-70" : ""
        }`}
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
