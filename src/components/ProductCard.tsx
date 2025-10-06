import { Trash2 } from "lucide-react";
import type { Product } from "../types";
import { formatDateWithOrdinal } from "../utils";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Button, Modal } from "@mantine/core";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      close();
      setDeleting(false);
    }, 1000);
  };

  return (
    <>
      <div className="w-[800px] min-h-44 bg-white rounded-md py-6 px-12 border-1 border-gray-200 flex flex-col gap-2 hover:shadow-md duration-200 cursor-pointer hover:bg-gray-50">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">{product.name}</h1>
          <span
            className="flex items-center justify-center w-7 h-7 bg-red-100 rounded-full hover:bg-red-200 duration-200 cursor-pointer"
            onClick={open}
          >
            <Trash2 className="w-3.5 h-3.5 cursor-pointer text-red-500" />
          </span>
        </div>
        <h1 className="text-sm text-gray-500">
          Categories: {product.categories.join(",")}
        </h1>
        <h1 className="text-sm text-gray-500">
          Price: ${product.price} | Rent: ${product.rent} daily
        </h1>
        <h1 className="text-sm">{product.description}</h1>
        <div className="flex justify-between mt-4">
          <h1 className="text-sm text-gray-500">
            Date posted: {formatDateWithOrdinal(product.createdAt)}
          </h1>
          <h1 className="text-sm text-gray-500">{product.views} views</h1>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Delete Product" centered>
        <div className="flex flex-col gap-4">
          <p className="text-gray-500">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-4">
            <Button onClick={close} color="black" radius="md">Cancel</Button>
            <Button onClick={handleDelete} loading={deleting} color="red" radius="md">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
