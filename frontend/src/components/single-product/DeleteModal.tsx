import { Button, Modal } from "@mantine/core";
import { MUTATION_DELETE_PRODUCT } from "../../graphql/products/mutations";
import { QUERY_USER_PRODUCTS } from "../../graphql/products/queries";
import type {
  DeleteProductMutation,
  DeleteProductMutationVariables,
} from "../../types/product";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

type DeleteModalProps = {
  deleteOpened: boolean;
  deleteClose: () => void;
  refetch: () => void;
  productId: string;
};

const DeleteModal = ({
  deleteOpened,
  deleteClose,
  refetch,
  productId,
}: DeleteModalProps) => {
  const [deleteProduct] = useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(MUTATION_DELETE_PRODUCT);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (!productId) {
        notifications.show({
          title: "Error",
          message: "Missing product id",
          color: "red",
        });
        return;
      }
      const { data: result } = await deleteProduct({
        variables: { id: productId },
        refetchQueries: [
          {
            query: QUERY_USER_PRODUCTS,
            variables: { pageSize: 5, page: 1, search: "" },
          },
        ],
        awaitRefetchQueries: true,
      });

      const status = result?.deleteProduct.statusCode as
        | number
        | string
        | undefined;
      const isSuccess =
        status === 200 ||
        status === 201 ||
        status === "OK" ||
        status === "CREATED";
      if (isSuccess) {
        notifications.show({
          title: "Success",
          message: result?.deleteProduct.message,
          color: "green",
        });
        refetch();
        navigate("/my-products");
      } else {
        notifications.show({
          title: "Error",
          message: result?.deleteProduct.message,
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "An error occurred",
        color: "red",
      });
    } finally {
      setLoading(false);
      deleteClose();
    }
  };
  return (
    <Modal
      opened={deleteOpened}
      onClose={deleteClose}
      title="Delete Product"
      centered
      radius="md"
    >
      <div className="flex flex-col gap-4">
        <p className="text-gray-500">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={deleteClose}
            color="black"
            radius="md"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            loading={loading}
            disabled={loading}
            color="red"
            radius="md"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
