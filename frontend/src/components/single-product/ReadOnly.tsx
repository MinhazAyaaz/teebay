import type { Product } from "../../types/product";
import { formatDateWithOrdinal } from "../../utils";
import { CATEGORIES, RENT_INTERVALS } from "../../constants";
import { Divider } from "@mantine/core";

type ReadOnlyProps = {
  product: Product;
};

const ReadOnly = ({ product }: ReadOnlyProps) => {

  return (
    <div className={`w-full max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl min-h-44 bg-white rounded-md py-4 px-4 sm:py-6 sm:px-8 md:px-12 border border-black flex flex-col gap-2`}>
      <div className="flex justify-between">
        <h1 className="text-base sm:text-lg font-bold">{product.title}</h1>
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
        <h1 className="text-xs sm:text-sm text-gray-500">{product.views || 0} views</h1>
      </div>
    </div>
  );
};

export default ReadOnly;
