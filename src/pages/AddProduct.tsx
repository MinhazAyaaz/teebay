import {
  Anchor,
  Button,
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
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [rentType, setRentType] = useState("");
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={categories}
                onChange={(values) => setCategories(values)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </>
          )}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <TextInput
                label="Price"
                description="Enter the price of the product"
                required
                w={500}
                radius="md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="flex flex-row gap-4">
              <TextInput
                label="Rent"
                description="Enter the rent of the product"
                required
                w={500}
                radius="md"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
              />
              <Select
                label="Rent Type"
                description="Select the rent type of the product"
                required
                w={300}
                radius="md"
                data={["Daily", "Weekly", "Monthly", "Yearly"]}
                value={rentType}
                onChange={(e) => setRentType(e?.target?.value)}
              />
            </div>
            </div>
          )}
          {step === 5 && (
            <div className="border rounded-lg shadow-sm bg-white p-6 w-[500px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Title</span>
                  <span className="font-medium text-gray-800 text-right break-words">{title || "-"}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Categories</span>
                  <div className="flex flex-wrap gap-2 justify-end max-w-[70%]">
                    {categories.length ? (
                      categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-700 border"
                        >
                          {category}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Description</span>
                  <p className="mt-1 text-sm text-gray-800 bg-gray-50 rounded-md p-3 max-h-40 overflow-auto">
                    {description || "-"}
                  </p>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Price</span>
                  <span className="font-medium text-gray-800">{price || "-"}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Rent</span>
                  <span className="font-medium text-gray-800">{rent || "-"}</span>
                </div>
              </div>
              <hr className="my-6" />
              <Button type="submit" color="black" radius="md" fullWidth>
                Submit
              </Button>
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
