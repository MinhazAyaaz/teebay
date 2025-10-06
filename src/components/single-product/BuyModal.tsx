import { Button, Modal } from "@mantine/core";

type BuyModalProps = {
  buyOpened: boolean;
  buyClose: () => void;
  handleBuy: () => void;
  loading: boolean;
};

const BuyModal = ({
  buyOpened,
  buyClose,
  handleBuy,
  loading,
}: BuyModalProps) => {
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
          <Button onClick={handleBuy} loading={loading} color="blue" radius="md">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BuyModal;
