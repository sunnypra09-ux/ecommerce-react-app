
import React, { useEffect, useId, useMemo, useState } from "react";

import { useProducts } from "../hooks/useProducts";

import { ProductCard, LoadingSpinner, ErrorState } from "../components";

import { useNavigate, useSearchParams } from "react-router-dom";

const Shop = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(["All"]);
  const [brand, setBrand] = useState("All");
  const [range, setRange] = useState(5000);

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const id = useId();
  const navigate = useNavigate();

  const perpageItems = 8;
  const [currPage, setCurrPage] = useState(1);

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

  const totalPage = Math.ceil(filteredProducts.length / perpageItems);

  const currProducts = useMemo(() => {
    const startIdx = (currPage - 1) * perpageItems;
    const endIdx = startIdx + perpageItems;

    return filteredProducts.slice(startIdx, endIdx);
  }, [filteredProducts, currPage]);

  useEffect(() => {
    setCurrPage(1);
  }, [search, category, brand, range]);

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

      return [
        ...prev.filter((item) => item !== "All"),
        selectedCategory,
      ];
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

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorState error={error} />;

  if (currProducts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Product not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            onClick={handleReset}
            className="mt-5 rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 pb-8 lg:grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-5">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Search
          </label>

          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Categories */}
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Category
          </h2>

          <div className="max-h-52 space-y-2 overflow-y-auto pr-2">
            {categories?.map((item) => (
              <label
                htmlFor={`${id}_${item}`}
                key={item}
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <input
                  onChange={() => handleCategoryChange(item)}
                  checked={category.includes(item)}
                  type="checkbox"
                  id={`${id}_${item}`}
                  className="h-4 w-4 accent-red-500"
                />

                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Brand
          </h2>

          <select
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
          >
            {brands?.map((brand) => (
              <option value={brand} key={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Price Range
            </h2>

            <span className="text-sm font-medium text-gray-600">
              ₹{range}
            </span>
          </div>

          <input
            onChange={(e) => setRange(Number(e.target.value))}
            value={range}
            type="range"
            max={5000}
            min={1}
            className="w-full accent-red-500"
          />

          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>₹1</span>
            <span>₹5000</span>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="mt-7 w-full rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          Reset Filters
        </button>
      </aside>

      {/* Products */}
      <main>
        {/* Header */}
        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category[0] === "All"
                ? "All Products"
                : category[category.length - 1]}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {filteredProducts.length} products found
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid w-full grid-cols-2 items-start gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {currProducts?.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => handleProductCard(product.id)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {currPage !== 1 && (
            <button
              onClick={() => setCurrPage((prev) => prev - 1)}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Prev
            </button>
          )}

          {Array.from({ length: totalPage }).map((_, idx) => (
            <button
              onClick={() => setCurrPage(idx + 1)}
              key={idx + 1}
              className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                currPage === idx + 1
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          {currPage !== totalPage && (
            <button
              onClick={() => setCurrPage((prev) => prev + 1)}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;

