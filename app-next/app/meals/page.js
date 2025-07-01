import MealList from "@/components/MealList/MealList";

const MealsPage = () => {
  const title = "All Meals";
  return (
    <section className="px-6 pt-10 sm:px-10 lg:px-20 py-2 max-w-screen-xl mx-auto text-center  dark:bg-gray-800">
      <div className="mx-auto w-full max-w-[960px] pt-5"></div>
      <MealList title={title} backGround="bg-white" />
    </section>
  );
};
export default MealsPage;
