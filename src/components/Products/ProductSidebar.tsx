import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";

import useData, { Product } from "../../hooks/useData";
import { NavLink } from "react-router-dom";

const ProductSidebar = () => {
  const { data: categories, errorMsg } = useData<Product[]>("/category");

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
                        src={`http://localhost:5000/category/${category.image}`}
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
