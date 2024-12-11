import Table from "../common/Table";

interface MyOrderPageProps {
  total: number;
}

const MyOrderPage = ({ total }: MyOrderPageProps) => {
  return (
    <section className="my_order flex justify-center">
      <Table
        headings={["Order", "Products", "Total", "Status"]}
        orders={[
          {
            products: ["iPhone 16", "Airpods", "Headphones"],
            status: "Shipped",
            total: total,
          },
        ]}
      />
    </section>
  );
};

export default MyOrderPage;
