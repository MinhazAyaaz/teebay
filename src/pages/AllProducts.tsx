import { Input, Pagination, ScrollArea } from "@mantine/core";
import ProductCard from "../components/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductCardLoader from "../components/ProductCardLoader";
import { useQuery } from "@apollo/client/react";
import { QUERY_PRODUCTS } from "../graphql/products/queries";
import type { Product, ProductQuery, ProductsVars } from "../types/product";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, loading, refetch } = useQuery<ProductQuery, ProductsVars>(
    QUERY_PRODUCTS,
    {
      variables: { search: "", page: 1, pageSize },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    const id = setTimeout(() => {
      refetch({ search, page, pageSize });
    }, 300);
    return () => clearTimeout(id);
  }, [search, page, pageSize, refetch]);

  const products = useMemo(() => data?.products?.items ?? [], [data]);
  const total = data?.products?.total ?? 0;

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start gap-4 sm:gap-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full px-2 sm:px-4 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
          All Products
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
        </div>
      </div>
      <ScrollArea mah={690} className="w-full max-w-6xl" scrollbars="y">
        {loading ? (
          <ProductCardLoader />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                type="all-products"
              />
            ))}
          </div>
        )}
      </ScrollArea>
      <Pagination
        color="black"
        total={Math.max(1, Math.ceil(total / pageSize))}
        value={page}
        radius="md"
        onChange={setPage}
        className="w-full sm:w-auto"
      />
    </div>
  );
};

export default AllProducts;
