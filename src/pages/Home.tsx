import { Button, ScrollArea } from "@mantine/core"
import { MY_MOCK_PRODUCTS } from "../constants"
import ProductCard from "../components/ProductCard"

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-start gap-4 sm:gap-6 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-700">My Products</h1>
      <ScrollArea h={700} className="w-full max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
          {MY_MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollArea>
      <Button onClick={() => {}} color="black" radius="md" className="w-full sm:w-auto">Add Product</Button>
    </div>
  )
}

export default Home