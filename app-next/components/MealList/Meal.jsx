const MealCard = ({ meal }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] w-full max-w-[300px]  gap-2 h-full  rounded-lg bg-white shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-full ">
        <h4 className="text-md font-medium text-gray-800 mb-1">{meal.title}</h4>

        <p className="text-xs text-gray-500 mb-2  text-justify ">
          {meal.description}
        </p>

        <div className="text-sm text-gray-600 space-y-1 text-justify">
          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(meal.when).toLocaleDateString("en-EN")}
          </p>
          <p>
            <span className="font-medium">Location:</span> {meal.location}
          </p>
          <p>
            <span className="font-medium">Max reservation:</span>{" "}
            {meal.max_reservation}
          </p>
        </div>

        <p className="text-orange-600 font-bold text-base mt-2 border hover:bg-orange-600 px-3 py-1 rounded-2xl inline-block">
          ${meal.price}
        </p>
      </div>
    </div>
  );
};

export default MealCard;
