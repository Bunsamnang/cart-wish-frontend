import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import useData, { Product } from "../../hooks/useData";
import { NavLink } from "react-router-dom";

const ProductSidebar = () => {
  const { data: categories, errorMsg } = useData<Product[]>("/category");

  return (
    <aside className="bg-white ">
      <h1 className="text-2xl font-semibold mt-2 ml-5">Category</h1>
      <Sidebar className="w-full bg-white ">
        <SidebarItems>
          {errorMsg ? (
            <p className="text-red-500 ">{errorMsg}</p>
          ) : (
            <SidebarItemGroup>
              {categories &&
                categories.map((category) => (
                  <SidebarItem key={category._id}>
                    <NavLink to={`/products?category=${category.name}`}>
                      <span className="text-xl inline-flex justify-center items-center gap-2">
                        <img
                          src={`http://localhost:5000/category/${category.image}`}
                          className="w-5 h-5 "
                        />
                        <span className="truncate">{category.name}</span>
                      </span>
                    </NavLink>
                  </SidebarItem>
                ))}
            </SidebarItemGroup>
          )}
        </SidebarItems>
      </Sidebar>
    </aside>
  );
};

export default ProductSidebar;
