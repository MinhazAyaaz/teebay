import {
  Anchor,
  MultiSelect,
  Progress,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const AddProduct = () => {
  const [step, setStep] = useState(1);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center pb-24">
      <div className="flex flex-col gap-4 max-w-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700 text-center">
          Add Product
        </h1>
        <Progress value={step * 20} animated color="blue" w={500} />
        <h1 className="text-sm text-gray-500">Step {step} of 5</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <TextInput
                label="Title"
                description="Enter the title of the product"
                required
                w={500}
                radius="md"
              />
            </>
          )}
          {step === 2 && (
            <>
              <MultiSelect
                label="Categories"
                description="Select the categories of the product"
                required
                w={500}
                radius="md"
                data={["Electronics", "Clothing", "Furniture", "Other"]}
              />
            </>
          )}
          {step === 3 && (
            <>
              <Textarea
                label="Description"
                description="Enter the description of the product"
                required
                w={500}
                radius="md"
                resize="vertical"
              />
            </>
          )}
          {step === 4 && (
            <>
              <TextInput
                label="Price"
                description="Enter the price of the product"
                required
                w={500}
                radius="md"
              />
            </>
          )}
          {step === 5 && (
            <div className="flex flex-row gap-4">
              <TextInput
                label="Rent"
                description="Enter the rent of the product"
                required
                w={500}
                radius="md"
              />
              <Select
                label="Rent Type"
                description="Select the rent type of the product"
                required
                w={300}
                radius="md"
                data={["Daily", "Weekly", "Monthly", "Yearly"]}
              />
            </div>
          )}
        </form>
        <div className="flex justify-between w-full">
          <Anchor
            className="!flex !flex-row justify-center items-center gap-2"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Anchor>
          <Anchor
            className="!flex !flex-row justify-center items-center gap-2"
            onClick={() => {
              if (step < 5) {
                setStep(step + 1);
              }
            }}
          >
            Next <ArrowRight className="w-4 h-4" />
          </Anchor>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
