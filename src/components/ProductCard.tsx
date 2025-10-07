import { Trash2 } from "lucide-react";
import { formatDateWithOrdinal } from "../utils";
import { useDisclosure } from "@mantine/hooks";
import { Divider } from "@mantine/core";
import type { Product } from "../types/product";
import { CATEGORIES, RENT_INTERVALS } from "../constants";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./single-product/DeleteModal";
 
type ProductCardProps = {
  product: Product;
  type: "my-products" | "all-products";
  hover?: boolean;
  refetch: () => void;
};

const ProductCard = ({ product, type, hover = true, refetch }: ProductCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  console.log(product);

  return (
    <>
      <div
        onClick={() => {
          if (hover) {
            navigate(`/${type}/${product.id}`);
          }
        }}
        className={`w-full max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl min-h-44 bg-white rounded-md py-4 px-4 sm:py-6 sm:px-8 md:px-12 border border-black flex flex-col gap-2 ${hover ? "hover:bg-gray-50 cursor-pointer hover:shadow-md duration-200" : ""}`}
      >
        <div className="flex justify-between">
          <h1 className="text-base sm:text-lg font-bold">{product.title}</h1>
          {type === "my-products" && (
            <span
              className="flex items-center justify-center w-7 h-7 bg-red-100 rounded-full hover:bg-red-200 duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              <Trash2 className="w-3.5 h-3.5 cursor-pointer text-red-500" />
            </span>
          )}
        </div>
        <h1 className="text-xs sm:text-sm text-gray-500">
          <span className="font-bold">Categories:</span> {(product.categories ?? [])
            .map((category) => CATEGORIES[category.category] ?? category.category)
            .join(", ")}
        </h1>
        <h1 className="text-xs sm:text-sm text-gray-500">
          <span className="font-bold">Price:</span> ${product.salePrice} | <span className="font-bold">Rent:</span> ${product.rentPrice} {RENT_INTERVALS[product.rentInterval] ?? product.rentInterval}
        </h1>
        <h1 className="text-xs sm:text-sm">{product.description}</h1>
        <Divider className="my-1" />
        <div className="flex justify-between">
          <h1 className="text-xs sm:text-sm text-gray-500">
            <span className="font-bold">Date posted:</span> {formatDateWithOrdinal(product.createdAt)}
          </h1>
          <h1 className="text-xs sm:text-sm text-gray-500">
            {product.views || 0} views
          </h1>
        </div>
      </div>
      <DeleteModal deleteOpened={opened} deleteClose={close} refetch={refetch} productId={product.id} />
    </>
  );
};

export default ProductCard;
