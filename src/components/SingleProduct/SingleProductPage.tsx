import { useState } from "react";
import useData, { Product } from "../../hooks/useData";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import QuantityInput from "./QuantityInput";

const SingleProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    errorMsg,
    isLoading,
  } = useData<Product>(`/products/${id}`);
  console.log(product);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {errorMsg ? (
        <p className="text-red-500 text-center">{errorMsg}</p>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <LoaderCircle className="animate-spin text-slate-800 w-10 h-10 " />
            </div>
          ) : (
            product && (
              <>
                <section className="grid grid-cols-[2fr_1.8fr] place-items-center mt-10">
                  <div className="flex gap-10 justify-center">
                    <div className="flex flex-col justify-center gap-4 single-product-thumbnail">
                      {product?.images.map((image, index) => (
                        <img
                          src={`http://localhost:5000/products/${image}`}
                          key={index}
                          className={`w-20 h-20 rounded-md shadow cursor-pointer ${
                            selectedImage === index ? "scale-110" : ""
                          } transition-all 0.3s ease-in`}
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                    </div>
                    <img
                      src={`http://localhost:5000/products/${product?.images[selectedImage]}`}
                      alt={product?.title}
                      className="rounded-md single-product-display w-[40%] shadow aspect-square object-contain"
                    />
                  </div>
                  <div className="single-product-details flex flex-col ">
                    <h1 className="text-2xl font-bold mb-2">
                      {product?.title}
                    </h1>
                    <p>{product?.description}</p>
                    <p className="font-semibold mt-2 text-xl">
                      ${product?.price}
                    </p>
                    <h2 className="text-xl font-semibold my-5">Quantity</h2>
                    <div className="flex items-center gap-5">
                      <QuantityInput
                        quantity={quantity}
                        setQuantity={setQuantity}
                        stock={product.stock}
                      />
                    </div>
                    <button className="text-left mt-4 px-5 py-2 rounded-full bg-violet-500 text-white self-start hover:bg-violet-600">
                      Add to Cart
                    </button>
                  </div>
                </section>
              </>
            )
          )}
        </>
      )}
    </>
  );
};

export default SingleProductPage;
