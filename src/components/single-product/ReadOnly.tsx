import type { Product } from "../../types/product";
import { formatDateWithOrdinal } from "../../utils";
import { CATEGORIES, RENT_INTERVALS } from "../../constants";

type ReadOnlyProps = {
  product: Product;
};

const ReadOnly = ({ product }: ReadOnlyProps) => {

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          {product.title}
      </h2>
      <p className="text-xs sm:text-sm text-gray-500">
        Categories: {product.categories.map((category) => CATEGORIES[category.category]).join(", ") || "N/A"}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
        <p className="text-gray-700">Price: $ {product.salePrice}</p>
        <p className="text-gray-700">Rent: $ {product.rentPrice} {RENT_INTERVALS[product.rentInterval]}</p>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        {product.description}
      </p>
      <div className="flex justify-between gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
          <p>Created: {formatDateWithOrdinal(product.createdAt)}</p>
          <p>Views: {product.views}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadOnly;
