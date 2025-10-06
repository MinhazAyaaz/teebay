import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold font-mono text-gray-700">
        SAZIM TEST APP
      </h1>
      <h1 className="text-md font-bold font-mono text-gray-700">
        Please select an option to continue.
      </h1>
      <div className="flex flex-row gap-8">
      <Button
        radius="md"
        color="blue"
        variant="outline"
        onClick={() => {
          navigate("/my-products");
        }}
        className="text-xl font-bold font-mono text-gray-700 hover:bg-gray-700 duration-200"
      >
        My Products
      </Button>
      <Button
        radius="md"
        color="blue"
        variant="outline"
        onClick={() => {
            navigate("/all-products");
        }}
        className="text-xl font-bold font-mono text-gray-700 hover:bg-gray-700 duration-200"
      >
          All Products
        </Button>
       </div>
    </div>
  );
};

export default Home;
