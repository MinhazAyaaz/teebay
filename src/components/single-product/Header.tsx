import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SingleProductHeaderProps = {
  onBack: () => void;
  canEdit: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onDelete: () => void;
};

const SingleProductHeader = ({ onBack, canEdit, isEditing, onStartEdit, onDelete }: SingleProductHeaderProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      close();
      setDeleting(false);
    }, 1000);
    onDelete();
    navigate("/my-products");
  };
  return (
    <>
    <div className="flex flex-col sm:flex-row justify-between max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full px-6 sm:px-8 md:px-0 gap-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-700">Product Details</h1>
      <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <Button color="gray" variant="light" radius="md" onClick={onBack}>
          Back
        </Button>
        {canEdit && !isEditing && (
          <Button color="black" radius="md" onClick={onStartEdit}>
            Edit
          </Button>
        )}
        {canEdit && !isEditing && (
          <Button color="red" radius="md" onClick={open}>
            Delete
          </Button>
        )}
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

export default SingleProductHeader;


