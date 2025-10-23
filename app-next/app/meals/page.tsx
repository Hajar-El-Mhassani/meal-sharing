"use client";
export const dynamic = "force-dynamic";
import MealList from "../../components/MealList/MealList";
import nextDynamic from "next/dynamic";
import { Suspense } from "react";
import HeaderMealsPage from "../../components/FilterMeals/HeaderMeals";
// Load MealFilters as a client-only component dynamically
const MealFilters = nextDynamic(
  () => import("../../components/FilterMeals/MealFilters"),
  {
    ssr: false,
  }
);
const MealsPage = () => {
  return (
    <>
      <HeaderMealsPage />
      <section className="px-6 sm:px-10 lg:px-20 py-1 max-w-screen-xl bg-white mx-auto text-center bg-white-300 dark:bg-gray-800">
        <div className="mx-auto w-full ">
          <Suspense fallback={<div>Loading filters...</div>}>
            <MealFilters />
            <MealList title="" backGround="white" />
          </Suspense>
        </div>
      </section>
    </>
  );
};
export default MealsPage;
