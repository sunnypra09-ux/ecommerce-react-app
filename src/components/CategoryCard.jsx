const CategoryCard = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className="flex flex-col items-center gap-3 text-xl font-semibold cursor-pointer "
    >
      <img
        src={item.image}
        alt={item.category}
        className="h-20 w-20 rounded-full bg-gray-200 object-cover"
      />

      <h1 className="line-clamp-1 text-sm capitalize">{item.category}</h1>
    </div>
  );
};

export default CategoryCard;
