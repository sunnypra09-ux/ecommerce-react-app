
import React, { useMemo } from "react";

import { useProducts } from "../hooks/useProducts";

import { LoadingSpinner, ErrorState } from "../components";

// Import Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carsouel = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    status,
  } = useProducts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  const swiperData = useMemo(() => {
    return [...products]
      .map((product) => ({
        ...product,
        reviewsCount: product.reviews?.length ?? 0,
        score: product.rating * (product.reviews?.length ?? 0),
      }))
      .sort((a, b) => {
        return b.score - a.score;
      });
  }, [products]);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={25}
      slidesPerView={1}
      navigation
      loop
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true, dynamicBullets: true }}
    >
      {swiperData.slice(0, 8).map((product) => {
        return (
          <SwiperSlide key={product.id}>
            <div className="flex min-h-[430px] items-center justify-between overflow-hidden rounded-2xl bg-gray-900 px-8 py-10 md:px-14">
              
              {/* Content */}
              <div className="flex w-[60%] flex-col gap-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400 md:text-base">
                  Powering your world with world's best products
                </h3>

                <h1 className="line-clamp-3 text-3xl font-bold leading-tight text-white md:text-5xl">
                  {product.title}
                </h1>

                <p className="line-clamp-3 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                  {product.description}
                </p>

                <button className="w-fit rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600">
                  Shop Now
                </button>
              </div>

              {/* Product Image */}
              <div className="flex w-[35%] justify-center">
                <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg md:h-80 md:w-80">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-contain p-6"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carsouel;

