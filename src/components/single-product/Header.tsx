import { Button } from "@mantine/core";

type SingleProductHeaderProps = {
  onBack: () => void;
  canEdit: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
};

const SingleProductHeader = ({ onBack, canEdit, isEditing, onStartEdit }: SingleProductHeaderProps) => {
  return (
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
      </div>
    </div>
  );
};

export default SingleProductHeader;


