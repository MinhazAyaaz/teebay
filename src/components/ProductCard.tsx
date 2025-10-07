import { Trash2 } from "lucide-react";
import { formatDateWithOrdinal } from "../utils";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Button, Divider, Modal } from "@mantine/core";
import type { Product } from "../types/product";
import { CATEGORIES, RENT_INTERVALS } from "../constants";
import { useMutation } from "@apollo/client/react";
import { MUTATION_DELETE_PRODUCT } from "../graphql/products/mutations";
import type { DeleteProductMutation, DeleteProductMutationVariables } from "../types/product";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
 
type ProductCardProps = {
  product: Product;
  type: "my-products" | "all-products";
  hover?: boolean;
  refetch: () => void;
};

const ProductCard = ({ product, type, hover = true, refetch }: ProductCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const [deleteProduct] = useMutation<DeleteProductMutation , DeleteProductMutationVariables>(MUTATION_DELETE_PRODUCT);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { data: result } = await deleteProduct({
        variables: { id: product.id },
      });

      if (result?.deleteProduct.statusCode === 200) {
        notifications.show({
          title: "Success",
          message: result?.deleteProduct.message,
          color: "green",
        });
        refetch();
      } else {
        notifications.show({
          title: "Error",
          message: result?.deleteProduct.message,
          color: "red",
        });
      }
    } catch { 
      notifications.show({
        title: "Error",
        message: "An error occurred",
        color: "red",
      });
    } finally {
      setDeleting(false);
      close();
    }
  };

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
          Categories: {product.categories.map((category) => CATEGORIES[category.category]).join(",")}
        </h1>
        <h1 className="text-xs sm:text-sm text-gray-500">
          Price: ${product.salePrice} | Rent: ${product.rentPrice} {RENT_INTERVALS[product.rentInterval]}
        </h1>
        <h1 className="text-xs sm:text-sm">{product.description}</h1>
        <Divider className="my-1" />
        <div className="flex justify-between">
          <h1 className="text-xs sm:text-sm text-gray-500">
            Date posted: {formatDateWithOrdinal(product.createdAt)}
          </h1>
          <h1 className="text-xs sm:text-sm text-gray-500">
            {product.views} views
          </h1>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Delete Product" centered>
        <div className="flex flex-col gap-4">
          <p className="text-gray-500">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-4">
            <Button onClick={close} color="black" radius="md">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              loading={deleting}
              color="red"
              radius="md"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
