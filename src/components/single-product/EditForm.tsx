import {
  Button,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { CATEGORIES_OPTIONS, RENT_INTERVAL_OPTIONS } from "../../constants";
import {
  Controller,
  type Control,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";
import type { UpdateProductFormInput, UpdateProductMutation, UpdateProductMutationVariables } from "../../types/product";
import { MUTATION_UPDATE_PRODUCT } from "../../graphql/products/mutations";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useParams } from "react-router-dom";

type EditFormProps = {
  register: UseFormRegister<UpdateProductFormInput>;
  handleSubmit: UseFormHandleSubmit<UpdateProductFormInput>;
  control: Control<UpdateProductFormInput>;
  onCancel: () => void;
};

const EditForm = ({
  register,
  handleSubmit,
  control,
  onCancel,
}: EditFormProps) => {
  const [loading, setLoading] = useState(false);
  const [updateProduct] = useMutation<UpdateProductMutation, UpdateProductMutationVariables>(MUTATION_UPDATE_PRODUCT);
  const { id } = useParams();
  const onSubmit: SubmitHandler<UpdateProductFormInput> = async (data) => {
    setLoading(true);
    try {
      const { data: result } = await updateProduct({
        variables: { input: { id: id || "", ...data } },
      });
      if (result?.updateProduct.statusCode === 200) {
        notifications.show({
          title: "Success",
          message: result?.updateProduct.message,
          color: "green",
        });
        onCancel();
      } else {
        notifications.show({
          title: "Error",
          message: result?.updateProduct.message,
          color: "red",
        });
      }
    } catch {
      notifications.show({
        title: "Error",
        message: "An error occurred",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <TextInput
          radius="md"
          placeholder="Product name"
          {...register("title")}
          label="Title"
          disabled={loading}
        />
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <MultiSelect
              label="Categories"
              description="Select the categories of the product"
              required
              radius="md"
              data={CATEGORIES_OPTIONS}
              {...field}
              disabled={loading}
            />
          )}
        />
        <Textarea
          rows={10}
          radius="md"
          placeholder="Describe the product"
          label="Description"
          {...register("description")}
          disabled={loading}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <TextInput
            type="number"
            radius="md"
            label="Price"
            placeholder="Price"
            {...register("salePrice", { valueAsNumber: true })}
            disabled={loading}
          />
          <TextInput
            radius="md"
            placeholder="Rent"
            {...register("rentPrice", { valueAsNumber: true })}
            label="Daily rent"
            disabled={loading}
          />
          <Controller
            name="rentInterval"
            control={control}
            render={({ field }) => (
              <Select
                label="Intervals"
                radius="md"
                placeholder="Intervals"
                data={RENT_INTERVAL_OPTIONS}
                {...field}
                disabled={loading}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-row gap-3 justify-end">
        <Button color="gray" variant="light" radius="md" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button color="black" radius="md" type="submit" disabled={loading}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
