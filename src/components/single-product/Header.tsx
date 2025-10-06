import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import BuyModal from "./BuyModal";
import RentModal from "./RentModal";

type SingleProductHeaderProps = {
  onBack: () => void;
  canEdit: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onDelete: () => void;
};

const SingleProductHeader = ({
  onBack,
  canEdit,
  isEditing,
  onStartEdit,
  onDelete,
}: SingleProductHeaderProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);
  const [buyOpened, { open: buyOpen, close: buyClose }] = useDisclosure(false);
  const [rentOpened, { open: rentOpen, close: rentClose }] =
    useDisclosure(false);

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      deleteClose();
      setLoading(false);
    }, 1000);
    onDelete();
    navigate("/my-products");
  };

  const handleBuy = () => {
    setLoading(true);
    setTimeout(() => {
      buyClose();
      setLoading(false);
    }, 1000);
  };

  const handleRent = () => {
    setLoading(true);
    setTimeout(() => {
      rentClose();
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full px-6 sm:px-8 md:px-0 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
          Product Details
        </h1>
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
            <Button color="red" radius="md" onClick={deleteOpen}>
              Delete
            </Button>
          )}
          {!canEdit && (
            <Button color="black" radius="md" onClick={buyOpen}>
              Buy
            </Button>
          )}
          {!canEdit && (
            <Button color="black" radius="md" onClick={rentOpen}>
              Rent
            </Button>
          )}
        </div>
      </div>
      <DeleteModal
        deleteOpened={deleteOpened}
        deleteClose={deleteClose}
        handleDelete={handleDelete}
        loading={loading}
      />
      <BuyModal
        buyOpened={buyOpened}
        buyClose={buyClose}
        handleBuy={handleBuy}
        loading={loading}
      />
      <RentModal
        rentOpened={rentOpened}
        rentClose={rentClose}
        handleRent={handleRent}
        loading={loading}
      />
    </>
  );
};

export default SingleProductHeader;