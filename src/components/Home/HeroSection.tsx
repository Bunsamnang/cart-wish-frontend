interface HeroSectionProps {
  title: string;
  subTitle: string;
  link: string;
  image: string;
}

const HeroSection = ({ title, subTitle, link, image }: HeroSectionProps) => {
  return (
    <section className="hero_section grid grid-cols-2 p-10  bg-black text-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center gap-5">
      <div className="flex flex-col gap-7 h-full justify-center items-center text-center">
        <h1 className="text-2xl font-semibold max-sm:text-xl">{title}</h1>
        <p className="text-lg max-sm:text-sm">{subTitle}</p>
        <a href={link}>
          <button className=" bg-white rounded-full border-white  px-8  py-2 border text-black hover:bg-black hover:text-white transition-all duration-150 ease-in-out ">
            Buy Now
          </button>
        </a>
      </div>
      <div className="">
        <img
          src={image}
          alt=""
          className="hover:scale-105 transition-all duration-300 ease"
        />
      </div>
    </section>
  );
};

export default HeroSection;
