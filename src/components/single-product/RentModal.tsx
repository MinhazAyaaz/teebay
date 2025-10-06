import { Button, Modal } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useState } from "react";

type RentModalProps = {
  rentOpened: boolean;
  rentClose: () => void;
  handleRent: () => void;
  loading: boolean;
};

const RentModal = ({
  rentOpened,
  rentClose,
  handleRent,
  loading,
}: RentModalProps) => {
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);

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
                value={fromDate}
                onChange={setFromDate}
                className="w-1/2"
                required
                minDate={new Date()}
            />
            <DatePickerInput
                label="To Date"
                placeholder="Select to date"
                radius="md"
                value={toDate}
                onChange={setToDate}
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
