import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import useData, { Product } from "../../hooks/useData";

const ProductSidebar = () => {
  const { data: categories, errorMsg } = useData<Product[]>("/category");

  return (
    <aside className="bg-white">
      <h1 className="text-2xl font-semibold mt-2 ml-5">Category</h1>
      <Sidebar className="w-full bg-white !shadow-lg !rounded">
        <SidebarItems>
          {errorMsg ? (
            <p className="text-red-500 ">{errorMsg}</p>
          ) : (
            <SidebarItemGroup>
              {categories &&
                categories.map((category) => (
                  <SidebarItem href="/" key={category._id}>
                    <span className="text-xl inline-flex justify-center items-center gap-2">
                      <img
                        src={`http://localhost:5000/category/${category.image}`}
                        className="w-5 h-5"
                      />
                      {category.name}
                    </span>{" "}
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
