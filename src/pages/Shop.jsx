import React, { useEffect, useId, useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard, LoadingSpinner } from "../components";
import { useNavigate, useSearchParams } from "react-router-dom";

const Shop = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(["All"]);
  const [brand, setBrand] = useState("All");
  const [range, setRange] = useState(5000);

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  useEffect(() => {
    if (categoryFromURL) {
      setCategory(categoryFromURL.split(","));
    } else {
      setCategory(["All"]);
    }
  }, [categoryFromURL]);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((item) => item.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      const matchsearch =
        search === "" ||
        product.title.toLowerCase().includes(search.toLowerCase());

      const matchcategory =
        category.includes("All") || category.includes(product.category);

      const matchbrand = brand === "All" || product.brand === brand;

      const matchprice = product.price <= range;

      return matchsearch && matchcategory && matchbrand && matchprice;
    });
  }, [products, search, category, brand, range]);

  const brands = useMemo(() => {
    return [
      "All",
      ...new Set(filteredProducts.map((item) => item.brand).filter(Boolean)),
    ];
  }, [filteredProducts]);

  const id = useId();
  const navigate = useNavigate();

  const perpageItems = 8;
  const [currPage, setCurrPage] = useState(1);
  const totalPage = Math.ceil(filteredProducts.length / perpageItems);

  const currProducts = useMemo(() => {
    const startIdx = (currPage - 1) * perpageItems;
    const endIdx = startIdx + perpageItems;
    return filteredProducts.slice(startIdx, endIdx);
  }, [filteredProducts, currPage]);

  useEffect(() => {
    setCurrPage(1);
  }, [search, category, brand, range]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div>
        <h2>Someting went wrong</h2>
        {error.message}
      </div>
    );
  }
  if (currProducts.length === 0) {
    return (
      <div className="h-64 mt-12 text-center font-semibold ">
        <p className="text-2xl">Product not fount </p>
        <button
          onClick={handleReset}
          className="px-4 py-1 rounded-full mt-4 text-white bg-red-500 cursor-pointer"
        >
          reset filter
        </button>
      </div>
    );
  }

  const handleCategoryChange = (selectedCategory) => {
    setBrand("All");
    if (selectedCategory === "All") {
      setCategory(["All"]);
      return;
    }

    setCategory((prev) => {
      if (prev.includes(selectedCategory)) {
        const updated = prev.filter((item) => item !== selectedCategory);

        return updated.length === 0 ? ["All"] : updated;
      }

      return [...prev.filter((item) => item !== "All"), selectedCategory];
    });
  };

  const handleReset = () => {
    setSearch("");
    setRange(5000);
    setBrand("All");
    setCategory(["All"]);
  };

  const handleProductCard = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="grid grid-cols-[260px_1fr] gap-5 pb-5">
      <aside className="bg-white p-4 flex flex-col gap-3 ">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="search products..."
          className="outline-0 border-2 border-gray-300 w-full px-2 py-1 rounded"
        />

        <h1 className="text-xl font-semibold">Category</h1>
        <div className="space-y-0 overflow-y-auto h-50">
          {categories?.map((item) => (
            <label
              htmlFor={`${id}_${item}`}
              key={item}
              className="flex items-center gap-4 cursor-pointer"
            >
              <input
                onChange={() => handleCategoryChange(item)}
                checked={category.includes(item)}
                type="checkbox"
                id={`${id}_${item}`}
                className="accent-red-500"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <h1 className="text-xl font-semibold">Brands</h1>
        <select
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          className="outline-0 border-2 border-gray-300 w-full px-2 py-1 rounded"
        >
          {brands?.map((brand) => (
            <option value={brand} key={brand}>
              {brand}
            </option>
          ))}
        </select>

        <h1 className="text-xl font-semibold">Price Range</h1>
        <div>
          <p>$0 - ${range}</p>
          <input
            onChange={(e) => setRange(Number(e.target.value))}
            value={range}
            type="range"
            max={5000}
            min={1}
            className="accent-red-500 w-full"
          />
        </div>

        <button
          onClick={handleReset}
          className="w-fit px-4 py-1 text-white bg-red-500 rounded cursor-pointer"
        >
          Reset Filter
        </button>
      </aside>

      <div>
        <div className="pb-5">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <span>
              {category[0] === "All"
                ? "All Products"
                : category[category.length - 1]}
            </span>
            <span> {`(${filteredProducts.length})`}</span>
          </h1>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-5 w-full items-start">
          {currProducts?.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => handleProductCard(product.id)}
            />
          ))}
        </div>

        {/* pagination */}
        <div className="flex items-center gap-2 pt-5">
          {currPage !== 1 && (
            <button
              onClick={() => setCurrPage((prev) => prev - 1)}
              className="text-white rounded px-2 py-1 text-sm bg-red-500"
            >
              Prev
            </button>
          )}

          {Array.from({ length: totalPage }).map((_, idx) => (
            <button
              onClick={() => setCurrPage(idx + 1)}
              key={idx + 1}
              className={`${currPage === idx + 1 ? "bg-black text-white" : ""} cursor-pointer px-2 py-1 text-sm rounded `}
            >
              {idx + 1}
            </button>
          ))}

          {currPage !== totalPage && (
            <button
              onClick={() => setCurrPage((prev) => prev + 1)}
              className="text-white rounded px-2 py-1 text-sm bg-red-500"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
