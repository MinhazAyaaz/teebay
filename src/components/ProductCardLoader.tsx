import { Skeleton } from "@mantine/core";

const ProductCardLoader = () => {
  return (
    <div className="w-full justify-center items-center min-h-60 rounded-md py-4 px-4 sm:py-6 sm:px-8 md:px-12 mx-4 flex flex-col gap-6 sm:gap-10 hover:shadow-md duration-200">
      {[1,2,3].map(() => (
        <div className="w-full max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl min-h-44 bg-white rounded-md py-4 px-4 sm:py-6 sm:px-8 md:px-12 border-1 flex flex-col gap-2 hover:shadow-md duration-200 cursor-pointer hover:bg-gray-50">
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={300} />
        <Skeleton height={20} width={800} />
        <div className="w-full h-full flex flex-row justify-between mt-4">
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
        </div>
      </div>
      ))}
      {/* <h1 className="text-lg font-bold">Loading products...</h1>
      <Loader color="black" size="lg" /> */}
    </div>
  );
};

export default ProductCardLoader;
