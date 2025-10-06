import { Button, ScrollArea } from "@mantine/core"
import { MY_MOCK_PRODUCTS } from "../constants"
import ProductCard from "../components/ProductCard"

const Home = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold text-gray-700">My Products</h1>
      <ScrollArea h={680} px={24}>
        <div className="flex flex-col items-center justify-center flex-wrap gap-6">
          {MY_MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollArea>
        <Button onClick={() => {}} color="black" radius="md">Add Product</Button>
    </div>
  )
}

export default Home