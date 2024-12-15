import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import api_client from "../../utils/api_client";

interface Category {
  image: string;
  name: string;
  _id: string;
}

const ProductSidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchingCategory() {
      try {
        const res = await api_client.get("/category");
        const data = await res.data;

        setCategories(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        }
        console.error(error);
      }
    }

    fetchingCategory();
  }, []);

  return (
    <aside className="bg-white">
      <h1 className="text-2xl font-semibold mt-2">Category</h1>
      <Sidebar className="w-full bg-white !shadow-lg !rounded">
        <SidebarItems>
          {errorMsg ? (
            <p className="text-red-500 text-center">{errorMsg}</p>
          ) : (
            <SidebarItemGroup>
              {categories.map((category) => (
                <SidebarItem href="/">
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
