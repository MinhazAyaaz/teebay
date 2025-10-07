import { useMutation } from "@apollo/client/react";
import { Button, Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MUTATION_CREATE_BUY_ORDER } from "../../graphql/orders/mutations";
import type {
  CreateBuyOrderMutation,
  CreateBuyOrderMutationVariables,
} from "../../types/order";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { QUERY_ALL_PRODUCTS } from "../../graphql/products/queries";

type BuyModalProps = {
  buyOpened: boolean;
  buyClose: () => void;
  refetch: () => void;
  productId: string;
};

const BuyModal = ({
  buyOpened,
  buyClose,
  refetch,
  productId,
}: BuyModalProps) => {
  const [createBuyOrder] = useMutation<
    CreateBuyOrderMutation,
    CreateBuyOrderMutationVariables
  >(MUTATION_CREATE_BUY_ORDER, {
    refetchQueries: [
      {
        query: QUERY_ALL_PRODUCTS,
        variables: { pageSize: 5, page: 1, search: "" },
      },
    ],

    awaitRefetchQueries: true,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBuy = async () => {
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
      const user = localStorage.getItem("x-user-id");
      if (!user) {
        notifications.show({
          title: "Error",
          message: "Missing user id",
          color: "red",
        });
        return;
      }
      const { data: result } = await createBuyOrder({
        variables: { input: { productId } },
        awaitRefetchQueries: true,
      });

      const status = result?.createBuyOrder.statusCode as
        | number
        | string
        | undefined;
      const isSuccess = status === 200 || status === 201;

      if (isSuccess) {
        notifications.show({
          title: "Success",
          message: result?.createBuyOrder.message,
          color: "green",
        });
        refetch();
        navigate("/all-products");
      } else {
        notifications.show({
          title: "Error",
          message: result?.createBuyOrder.message,
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
      buyClose();
    }
  };

  return (
    <Modal
      opened={buyOpened}
      onClose={buyClose}
      title="Buy Product"
      centered
      radius="md"
    >
      <div className="flex flex-col gap-4">
        <p className="text-gray-500">
          Are you sure you want to buy this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button onClick={buyClose} color="black" radius="md">
            Cancel
          </Button>
          <Button
            onClick={handleBuy}
            loading={loading}
            color="blue"
            radius="md"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BuyModal;
