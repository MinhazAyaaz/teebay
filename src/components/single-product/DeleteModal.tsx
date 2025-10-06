import { Button, Modal } from "@mantine/core";

type DeleteModalProps = {
  deleteOpened: boolean;
  deleteClose: () => void;
  handleDelete: () => void;
  loading: boolean;
};

const DeleteModal = ({
  deleteOpened,
  deleteClose,
  handleDelete,
  loading,
}: DeleteModalProps) => {
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
          <Button onClick={deleteClose} color="black" radius="md">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            loading={loading}
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
