import MealList from "@/components/MealList/MealList";

const MealsPage = () => {
  return (
    <section className="px-6 pt-20 sm:px-10 lg:px-20 py-2  max-w-screen-xl mx-auto text-center  dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Discover <span className="text-orange-400">Delicious</span> Meals from
        All Around of <span className="text-lime-700">the World</span>
      </h1>
      <p className="text-gray-500 mb-6">
        Explore a variety of delicious dishes prepared with love. Whether you're
        craving something spicy, sweet, or savory
      </p>
      <MealList title="" backGround="bg-white" />
    </section>
  );
};
export default MealsPage;
