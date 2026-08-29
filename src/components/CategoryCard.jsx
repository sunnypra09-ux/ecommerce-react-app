const CategoryCard = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50"
    >
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 transition duration-300 group-hover:scale-105 group-hover:shadow-md">
        <img
          src={item.image}
          alt={item.category}
          className="h-full w-full object-cover"
        />
      </div>

      <h1 className="line-clamp-1 text-center text-sm font-semibold capitalize text-gray-700 transition group-hover:text-red-500">
        {item.category}
      </h1>
    </div>
  );
};

export default CategoryCard;
