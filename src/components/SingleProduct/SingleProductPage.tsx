import { useState } from "react";

const product = {
  id: 1,
  title: "Product Title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
  price: 9.99,
  images: [
    "https://via.placeholder.com/500x500?text=Product+Image+1",
    "https://via.placeholder.com/500x500?text=Product+Image+2",
    "https://via.placeholder.com/500x500?text=Product+Image+3",
    "https://via.placeholder.com/500x500?text=Product+Image+4",
  ],
};

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { title, description, price, images } = product;
  return (
    <section className="grid grid-cols-[2fr_1.6fr] place-items-center">
      <div className="flex gap-6">
        <div className="flex flex-col justify-center gap-4 single-product-thumbnail">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              className={`w-20 h-20 rounded-md cursor-pointer ${
                selectedImage === index ? "scale-110" : ""
              } transition-all 0.3s ease-in`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
        <img
          src={images[selectedImage]}
          alt={title}
          className="rounded-md single-product-display "
        />
      </div>
      <div className="single-product-details flex flex-col ">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p>{description}</p>
        <p className="font-semibold mt-2">${price}</p>
        <h2 className="text-xl font-semibold my-5">Quantity</h2>
        <div className="flex items-center ">
          <button
            disabled
            className="bg-red-600 w-8 h-8 text-white text-2xl rounded-full hover:bg-red-700"
          >
            -
          </button>
          <p className="mx-8">1</p>
          <button className="bg-green-600 w-8 h-8 text-white text-2xl rounded-full hover:bg-green-700 ">
            +
          </button>
        </div>
        <button className="text-left mt-4 px-5 py-2 rounded-full bg-violet-500 text-white self-start hover:bg-violet-600">
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default SingleProductPage;
