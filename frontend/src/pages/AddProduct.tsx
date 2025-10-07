import { useMutation } from "@apollo/client/react/react.cjs";
import {
  Button,
  MultiSelect,
  Progress,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { MUTATION_CREATE_PRODUCT } from "../graphql/products/mutations";
import {
  type CreateProductFormInput,
  type CreateProductMutation,
  type CreateProductMutationVariables,
} from "../types/product";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { CATEGORIES_OPTIONS, RENT_INTERVAL_OPTIONS } from "../constants";

const AddProduct = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [createProduct] = useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(MUTATION_CREATE_PRODUCT);
  const { register, handleSubmit, getValues, control } =
    useForm<CreateProductFormInput>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<CreateProductFormInput> = async (data) => {
    setLoading(true);
    try {
      const { data: result } = await createProduct({
        variables: { input: data },
      });

      if (result?.createProduct.statusCode === 201) {
        notifications.show({
          title: "Success",
          message: result?.createProduct.message,
          color: "green",
        });
        setCompleted(true);
        navigate("/my-products");
      } else {
        notifications.show({
          title: "Error",
          message: result?.createProduct.message,
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
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center pb-24">
      <div className="flex flex-col gap-4 max-w-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700 text-center">
          Add Product
        </h1>
        <Progress value={step * 20} animated color="gray" w={500} />
        <h1 className="text-sm text-gray-500">Step {step} of 5</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <TextInput
                label="Title"
                description="Enter the title of the product"
                required
                w={500}
                radius="md"
                {...register("title")}
                disabled={loading}
              />
            </>
          )}
          {step === 2 && (
            <>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    label="Categories"
                    description="Select the categories of the product"
                    required
                    w={500}
                    radius="md"
                    data= {CATEGORIES_OPTIONS}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={loading}
                  />
                )}
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
                {...register("description")}
                disabled={loading}
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
                type="number"
                {...register("salePrice", { valueAsNumber: true })}
                disabled={loading}
              />
              <div className="flex flex-row gap-4">
                <TextInput
                  label="Rent"
                  description="Enter the rent of the product"
                  required
                  w={500}
                  radius="md"
                  type="number"
                  {...register("rentPrice", { valueAsNumber: true })}
                  disabled={loading}
                />
                <Controller
                  name="rentInterval"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Rent Type"
                      description="Select the rent type of the product"
                      required
                      w={300}
                      radius="md"
                      data={RENT_INTERVAL_OPTIONS}
                      value={field.value ?? null}
                      onChange={(val) => field.onChange(val ?? "")}
                      onBlur={field.onBlur}
                      disabled={loading}
                    />
                  )}
                />
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="border rounded-lg shadow-sm bg-white p-6 w-[500px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Summary
              </h2>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Title</span>
                  <span className="font-medium text-gray-800 text-right break-words">
                    {getValues("title") || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Categories</span>
                  <div className="flex flex-wrap gap-2 justify-end max-w-[70%]">
                    {getValues("categories")?.length ? (
                      getValues("categories")!.map((category) => (
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
                    {getValues("description") || "-"}
                  </p>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Price</span>
                  <span className="font-medium text-gray-800">
                    {getValues("salePrice") || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Rent</span>
                  <span className="font-medium text-gray-800">
                    {getValues("rentPrice") || "-"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-500">Rent Interval</span>
                  <span className="font-medium text-gray-800">
                    {getValues("rentInterval") || "-"}
                  </span>
                </div>
              </div>
              <hr className="my-6" />
              <Button
                type="submit"
                color="black"
                radius="md"
                fullWidth
                loading={loading || completed}
                disabled={loading || completed}
              >
                Submit
              </Button>
            </div>
          )}
        </form>
        <div className="flex justify-between w-full">
          <button
            className="!flex !flex-row justify-center items-center gap-2 cursor-pointer text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || completed || step === 1}
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            className="!flex !flex-row justify-center items-center gap-2 cursor-pointer text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={step === 5 || loading || completed}
            onClick={() => {
              if (step < 5) {
                setStep(step + 1);
              }
            }}
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
