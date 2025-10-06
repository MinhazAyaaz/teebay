import type { Product } from "../../types";
import { formatDateWithOrdinal } from "../../utils";

type ReadOnlyProps = {
  product: Product;
};

const ReadOnly = ({ product }: ReadOnlyProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
        {product.name}
      </h2>
      <p className="text-xs sm:text-sm text-gray-500">
        Categories: {product.categories.join(", ")}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
        <p className="text-gray-700">Price: $ {product.price}</p>
        <p className="text-gray-700">Rent: $ {product.rent} {product.interval}</p>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        {product.description}
      </p>
      <div className="flex justify-between gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
          <p>Created: {formatDateWithOrdinal(product.createdAt)}</p>
          <p>Updated: {formatDateWithOrdinal(product.updatedAt)}</p>
          <p>Views: {product.views}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadOnly;
