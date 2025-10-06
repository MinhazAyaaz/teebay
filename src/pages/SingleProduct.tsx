import { Button } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MY_MOCK_PRODUCTS } from "../constants";
import type { Product } from "../types";
import SingleProductHeader from "../components/single-product/Header";
import EditForm from "../components/single-product/EditForm";
import ReadOnly from "../components/single-product/ReadOnly";
import SingleProductLoading from "../components/single-product/Loading";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isMyProduct = useMemo(() => location.pathname.startsWith("/my-products"), [location.pathname]);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Local editable copy when in edit mode
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [editRent, setEditRent] = useState("");
  const [editCategories, setEditCategories] = useState<string[]>([]);
  const [editDescription, setEditDescription] = useState("");
  const [editInterval, setEditInterval] = useState("");

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const numericId = Number(id);
      const found = MY_MOCK_PRODUCTS.find((p) => p.id === numericId) || null;
      setProduct(found);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [id]);

  useEffect(() => {
    if (product && isEditing) {
      setEditName(product.name);
      setEditPrice(product.price);
      setEditRent(product.rent);
      setEditCategories(product.categories);   
      setEditDescription(product.description);
      setEditInterval(product.interval);
    }
  }, [product, isEditing]);

  const handleStartEdit = () => {
    if (!product) return;
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!product) return;
    const updated: Product = {
      ...product,
      name: editName.trim() || product.name,
      price: typeof editPrice === "number" ? editPrice : product.price,
      rent: editRent.trim() || product.rent,
      categories: editCategories,
      interval: editInterval,
      description: editDescription,
      updatedAt: new Date().toISOString(),
    };
    setProduct(updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setProduct(null);
    setIsEditing(false);
  };

  if (loading) {
    return <SingleProductLoading />;
  }

  if (!product) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">Product not found</h1>
        <Button color="black" radius="md" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start gap-4 sm:gap-6 p-4 sm:p-6">
      <SingleProductHeader onBack={() => navigate(-1)} canEdit={isMyProduct} isEditing={isEditing} onStartEdit={handleStartEdit} onDelete={handleDelete} />

      <div className="w-full max-w-5xl overflow-y-auto">
        <div className="w-full rounded-md py-6 px-6 sm:px-8 md:px-1 flex flex-col gap-6">
          {!isEditing ? (
            <ReadOnly product={product} />
          ) : (
            <EditForm
              name={editName}
              price={editPrice} 
              rent={editRent}
              categories={editCategories}
            interval={editInterval}
            description={editDescription}
            setName={(v) => setEditName(v)}
            setPrice={(v) => setEditPrice(v)}
            setRent={(v) => setEditRent(v)}
            setCategories={(values) => setEditCategories(values)} 
            setInterval={(v) => setEditInterval(v)} 
            setDescription={(v) => setEditDescription(v)}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;