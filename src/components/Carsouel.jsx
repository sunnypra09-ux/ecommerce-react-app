import React, { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import Loading from "./Loading";

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

  if (isError) {
    return <div>{error.message}</div>;
  }

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
            <div className=" bg-rose-200 z-11 flex items-center justify-between p-10">
              <div className="flex flex-col gap-5  w-[60%]">
                <h3 className="text-red-500 font-semibold">
                  Powering your world with world's best products
                </h3>
                <h1 className="text-5xl font-bold text-white line-clamp-3 py-2">
                  {product.title}
                </h1>
                <p className="line-clamp-3 text-xl font-semibold text-gray-400">
                  {product.description}
                </p>
                <button className="bg-red-500 text-white rounded cursor-pointer px-2 py-1 w-fit">
                  Shop Now
                </button>
              </div>
              <div>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="rounded-full h-96 bg-white object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carsouel;
