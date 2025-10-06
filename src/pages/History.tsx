import { ScrollArea, Tabs } from "@mantine/core";
import { BoxIcon, DollarSign, HandHelping, ShoppingCart } from "lucide-react";
import ProductCardLoader from "../components/ProductCardLoader";
import { MY_MOCK_PRODUCTS } from "../constants";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

const History = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center mt-10 gap-8">
      <div className="flex flex-row gap-8 w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <Tabs defaultValue="first" className="w-full">
          <Tabs.List grow justify="center">
            <Tabs.Tab
              value="first"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<ShoppingCart />}
            >
              {" "}
              Bought
            </Tabs.Tab>
            <Tabs.Tab
              value="second"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<DollarSign />}
            >
              Sold
            </Tabs.Tab>
            <Tabs.Tab
              value="third"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<HandHelping />}
            >
              Borrowed
            </Tabs.Tab>
            <Tabs.Tab
              value="fourth"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<BoxIcon />}
            >
              Lent
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="first">
            <ScrollArea h={690} className="w-full max-w-6xl mt-6" scrollbars="y">
              {loading ? (
                <ProductCardLoader />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
                  {MY_MOCK_PRODUCTS.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      type="all-products"
                      hover={false}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="second">Rented</Tabs.Panel>
          <Tabs.Panel value="third">Sold</Tabs.Panel>
          <Tabs.Panel value="fourth">Lent</Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
