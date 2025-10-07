import { Button } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/product";
import SingleProductHeader from "../components/single-product/Header";
import EditForm from "../components/single-product/EditForm";
import ReadOnly from "../components/single-product/ReadOnly";
import SingleProductLoading from "../components/single-product/Loading";
import { useQuery } from "@apollo/client/react";
import { QUERY_PRODUCT_BY_ID } from "../graphql/products/queries";
import type { ProductQuery, UpdateProductFormInput } from "../types/product";
import { useForm } from "react-hook-form";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isMyProduct = useMemo(
    () => location.pathname.startsWith("/my-products"),
    [location.pathname]
  );

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { control, register, handleSubmit, reset } =
    useForm<UpdateProductFormInput>();

  const { data, refetch } = useQuery<ProductQuery, { id: string }>(
    QUERY_PRODUCT_BY_ID,
    {
      variables: { id: id || "" },
    }
  );

  useEffect(() => {
    if (data) {
      setProduct(data.getProductById);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      refetch({ id: id || "" });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [id, refetch]);

  useEffect(() => {
    if (product && isEditing) {
      reset({
        title: product.title,
        salePrice: product.salePrice,
        rentPrice: product.rentPrice,
        categories: product.categories.map((category) => category.category),
        rentInterval: product.rentInterval,
        description: product.description,
      });
    }
  }, [product, isEditing]);

  const handleStartEdit = () => {
    if (!product) return;
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <SingleProductLoading />;
  }

  if (!product) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
          Product not found
        </h1>
        <Button color="black" radius="md" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start gap-4 sm:gap-6 p-4 sm:p-6">
      <SingleProductHeader
        onBack={() => navigate(-1)}
        canEdit={isMyProduct}
        isEditing={isEditing}
        onStartEdit={handleStartEdit}
        refetch={refetch}
        productId={product?.id}
      />

      <div className="w-full max-w-5xl overflow-y-auto">
        <div className="w-full rounded-md py-6 px-6 sm:px-8 md:px-1 flex flex-col gap-6">
          {!isEditing ? (
            <ReadOnly product={product} />
          ) : (
            <EditForm
              control={control}
              register={register}
              handleSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
