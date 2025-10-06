import { Button, MultiSelect, Select, Textarea, TextInput } from "@mantine/core";

type EditFormProps = {
  name: string;
  price: number | "";
  rent: string;
  categories: string[];
  interval: string;
  description: string;
  setName: (v: string) => void;
  setPrice: (v: number | "") => void;
  setRent: (v: string) => void;
  setCategories: (v: string[]) => void;
  setInterval: (v: string) => void;
  setDescription: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

const EditForm = ({
  name,
  price,
  rent,
  categories,
  interval,
  description,
  setName,
  setPrice,
  setRent,
  setCategories,
  setInterval,
  setDescription,
  onCancel,
  onSave,
}: EditFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <TextInput radius="md" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} label="Title"/>
        <MultiSelect
          label="Categories"
          radius="md"
          placeholder="Categories (comma separated)"
          data={["Category 1", "Category 2", "Category 3"]}
          value={categories}
          onChange={(values) => setCategories(values)}
        />
        <Textarea
          rows={10}
          radius="md"
          placeholder="Describe the product"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <TextInput
            type="number"
            radius="md"
            label="Price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <TextInput radius="md" placeholder="Rent" value={rent} onChange={(e) => setRent(e.target.value)} label="Daily rent"/>
          <Select
            label="Intervals"
            radius="md"
            placeholder="Intervals"
            data={["Hourly", "Daily", "Weekly", "Monthly", "Yearly"]}
            value={interval}
            onChange={(value) => setInterval(value ?? "")}
          />
        </div>
        
        
      </div>

      <div className="flex flex-row gap-3 justify-end">
        <Button color="gray" variant="light" radius="md" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="black" radius="md" onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditForm;


