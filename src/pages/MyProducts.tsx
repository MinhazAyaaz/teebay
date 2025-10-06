import { Button, Input, Pagination, ScrollArea } from "@mantine/core";
import { MY_MOCK_PRODUCTS } from "../constants";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="h-screen w-full flex flex-col items-center justify-start gap-4 sm:gap-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full px-2 sm:px-4 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
          My Products
        </h1>
        <div className="flex flex-row gap-4 w-full sm:w-auto">
          <Input
            w={300}
            radius="md"
            placeholder="Search for a product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            rightSection={<Search className="w-4 h-4 text-gray-500" />}
          />
          <Link to="/add-product">
            <Button color="black" radius="md" className="w-full sm:w-auto">
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <ScrollArea h={690} className="w-full max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
          {MY_MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollArea>
      <Pagination
        color="black"
        total={10}
        value={1}
        radius="md"
        className="w-full sm:w-auto"
      />
    </div>
  );
};

export default MyProducts;
