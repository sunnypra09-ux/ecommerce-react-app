import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carsouel,
  CategoryCard,
  LoadingSpinner,
  ErrorState,
} from "../components";
import { useProducts } from "../hooks/useProducts";
import { IoGridSharp } from "react-icons/io5";

const Home = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const [categorySliceVar, setCategorySliceVar] = useState(true);
  const navigate = useNavigate();

  const categories = useMemo(() => {
    return products.reduce((acc, product) => {
      const existingcategory = acc.find(
        (item) => item.category === product.category,
      );

      if (!existingcategory) {
        acc.push({
          category: product.category,
          image: product.images[0],
        });
      }

      return acc;
    }, []);
  }, [products]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorState error={error} />;
  }
  
  const sliceValue = categorySliceVar ? 7 : categories.length;

  const handleOnClick = (cat) => {
    navigate(`/shop?category=${cat.category}`);
  };

  return (
    <div>
      <Carsouel />
      <section className="py-7">
        <div>
          <h1 className="text-2xl font-semibold ">Shop by category</h1>
          <span></span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-5 py-7">
          {categories.slice(0, sliceValue).map((product) => {
            return (
              <CategoryCard
                key={product.category}
                item={product}
                onClick={() => handleOnClick(product)}
              />
            );
          })}

          {categories.length > 7 && (
            <div
              onClick={() => setCategorySliceVar((prev) => !prev)}
              className="flex flex-col items-center gap-3 text-xl font-semibold cursor-pointer "
            >
              <div className="h-20 w-20 rounded-full bg-gray-200 object-cover flex items-center justify-center">
                <IoGridSharp />
              </div>
              <h1 className="line-clamp-1 text-sm capitalize">
                {categorySliceVar ? "show more" : "show less"}
              </h1>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
