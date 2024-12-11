import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

const ProductSidebar = () => {
  return (
    <aside className="bg-white">
      <h1 className="text-2xl font-semibold mt-2">Category</h1>
      <Sidebar className="w-full bg-white !shadow-lg !rounded">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="/">
              <span className="text-xl">🎮</span> Gaming Consoles
            </SidebarItem>
            <SidebarItem href="/">
              <span className="text-xl">🎧</span> Headphones
            </SidebarItem>
            <SidebarItem href="/">
              <span className="text-xl">💻</span> Laptops
            </SidebarItem>
            <SidebarItem href="/">
              <span className="text-xl">📱</span> Smartphones
            </SidebarItem>
            <SidebarItem href="/">
              <span className="text-xl">⌚</span> Smartwatches
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </aside>
  );
};

export default ProductSidebar;
