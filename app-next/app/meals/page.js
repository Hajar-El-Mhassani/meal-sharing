import MealList from "@/components/MealList/MealList";
import MealFilters from "@/components/FilterMeals/MealFilters";
const MealsPage = () => {
  return (
    <>
      <section className=" bg-meal-hero relative h-[60vh] flex items-center justify-center text-center text-white">
        <div className="bg-lime-600/30 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Discover <span className="text-orange-400">All Delicious</span>{" "}
            Meals from
            <br />
            All Around <span className="text-lime-900">the World</span>
          </h1>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-20 py-2 max-w-screen-xl bg-white mx-auto text-center bg-white-300 dark:bg-gray-800">
        <div className="mx-auto w-full ">
          <MealFilters />
          <MealList title="" backGround="white" />
        </div>
      </section>
    </>
  );
};
export default MealsPage;
