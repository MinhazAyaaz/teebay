import { Button } from "@mantine/core";
import { PackageSearch } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductNotFound = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  return (
    <div className="flex items-center justify-center px-2 sm:px-4 py-8">
      <div className="w-full max-w-xl p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700">
          <PackageSearch className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          No products found
        </h2>
        {pathname === "/my-products" && <Button
          color="black"
          radius="md"
          onClick={() => navigate("/add-product")}
        >
          Add a Product
        </Button>}
      </div>
    </div>
  );
};

export default ProductNotFound;
