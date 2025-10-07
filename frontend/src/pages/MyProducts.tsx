import { Button, Input, Pagination, ScrollArea } from "@mantine/core";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCardLoader from "../components/ProductCardLoader";
import type { Product, MyProductQuery, MyProductsVars } from "../types/product";
import { useQuery } from "@apollo/client/react";
import { QUERY_USER_PRODUCTS } from "../graphql/products/queries";
import ProductNotFound from "../components/ProductNotFound";

const MyProducts = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const pageSize = 5;
 
  const { data, loading, refetch } = useQuery<MyProductQuery, MyProductsVars>(
    QUERY_USER_PRODUCTS,
    {
      variables: { search: search, page: page, pageSize: pageSize },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    }
  );
 
  useEffect(() => {
    if (data && Array.isArray(data.getUserProducts.products)) {
      setProductData(data.getUserProducts.products);
      setTotal(data.getUserProducts.totalCount);
    }
  }, [data]);

  useEffect(() => {
    const id = setTimeout(() => {
      refetch({ search, page: page, pageSize: pageSize });
    }, 300);
    return () => clearTimeout(id);
  }, [search, page, pageSize, refetch]);

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
      <ScrollArea mah={690} className="w-full max-w-6xl" scrollbars="y">
        {!loading && productData.length === 0 && <ProductNotFound />} 
        {loading && productData.length === 0 ? (
          <ProductCardLoader />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
            {productData?.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                refetch={refetch}
                type="my-products"
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
        className="w-full sm:w-auto"
        onChange={setPage}
      />
    </div>
  );
};

export default MyProducts;
