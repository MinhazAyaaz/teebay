import { Button, Modal } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUERY_ALL_PRODUCTS } from "../../graphql/products/queries";
import type { CreateRentOrderMutation, CreateRentOrderMutationVariables } from "../../types/order";
import { notifications } from "@mantine/notifications";
import { MUTATION_CREATE_RENT_ORDER } from "../../graphql/orders/mutations";
import { useMutation } from "@apollo/client/react";

type RentModalProps = {
  rentOpened: boolean;
  rentClose: () => void;
  refetch: () => void;
  productId: string;
};


const RentModal = ({
  rentOpened,
  rentClose,
  refetch,
  productId,
}: RentModalProps) => {
  const [createRentOrder] = useMutation< 
  CreateRentOrderMutation,
  CreateRentOrderMutationVariables
>(MUTATION_CREATE_RENT_ORDER, {
  refetchQueries: [{ query: QUERY_ALL_PRODUCTS }],
  awaitRefetchQueries: true,
});
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const [startDate, setStartDate] = useState<Date>(new Date());
const [endDate, setEndDate] = useState<Date>(new Date());

const handleRent = async () => {
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
    const { data: result } = await createRentOrder({
      variables: { input: { productId, startDate: startDate?.toISOString(), endDate: endDate?.toISOString()} },
      awaitRefetchQueries: true,
    });

    const status = result?.createRentOrder.statusCode as number | string | undefined;
    const isSuccess = status === 200 || status === 201

    if (isSuccess) {
      notifications.show({
        title: "Success",
        message: result?.createRentOrder.message,
        color: "green",
      });
      refetch();
      navigate("/all-products");
    } else {
      notifications.show({
        title: "Error",
        message: result?.createRentOrder.message,
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
    rentClose();
  }
};

  return (
    <Modal
      opened={rentOpened}
      onClose={rentClose}
      title="Rental Period"
      centered
      radius="md"
    >
      <div className="flex flex-col gap-4">
        <p className="text-gray-500">
            Please select the rental period for the product.
        </p>
        <div className="flex flex-row gap-4 w-full justify-between mb-6">
            <DatePickerInput
                label="From Date"
                placeholder="Select from date"
                radius="md"
                value={startDate}
                onChange={(value) => setStartDate(new Date(value as string))}
                className="w-1/2"
                required
                minDate={new Date()}
            />
            <DatePickerInput
                label="To Date"
                placeholder="Select to date"
                radius="md"
                value={endDate}
                onChange={(value) => setEndDate(new Date(value as string))}
                className="w-1/2"
                required
                minDate={new Date()}
            />
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={rentClose} color="black" radius="md">
            Cancel
          </Button>
          <Button
            onClick={handleRent}
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

export default RentModal;
