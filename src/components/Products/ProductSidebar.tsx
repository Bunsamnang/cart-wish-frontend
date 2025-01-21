import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";

import useData from "../../hooks/useData";
import { NavLink } from "react-router-dom";

interface CategoryAPIResponse {
  image: string;
  name: string;
  _id: string;
}

const ProductSidebar = () => {
  const { data: categories, errorMsg } = useData<CategoryAPIResponse[]>(
    "/category",
    24 * 60 * 60 * 1000
  );

  console.log(categories);

  return (
    <aside className="bg-white" data-aos="fade-right">
      <h1 className="text-2xl font-semibold mt-2 ml-5">Category</h1>
      <Sidebar className="w-full bg-white">
        <SidebarItems>
          {errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <SidebarItemGroup>
              {categories &&
                categories.map((category) => (
                  <NavLink
                    to={`/products?category=${category.name}`}
                    key={category._id}
                    className={`block`}
                  >
                    <div className="text-xl inline-flex justify-center items-center gap-2">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/category/${
                          category.image
                        }`}
                        className="w-5 h-5"
                        alt={category.name}
                      />
                      <span className="truncate">{category.name}</span>
                    </div>
                  </NavLink>
                ))}
            </SidebarItemGroup>
          )}
        </SidebarItems>
      </Sidebar>
    </aside>
  );
};

export default ProductSidebar;
