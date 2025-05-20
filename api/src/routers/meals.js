import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";

const mealsRouter = express.Router();

//Router to get all meals
mealsRouter.get("/meals", async (req, res) => {
  try {
    const meals = await connection.select().from("meal");
    // check if meals is not empty
    console.log(meals);
    if (meals.length > 0) {
      res.status(StatusCodes.OK).json(meals);
    } else {
      res.status(StatusCodes.NOT_FOUND).send();
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Router to create or send new data
mealsRouter.post("/meals", async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      when,
      max_reservation,
      price,
      created_date,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !when ||
      !max_reservation ||
      !price ||
      !created_date
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required",
      });
    }
    const addMeas = await connection("meal").insert({
      title,
      description,
      location,
      when,
      max_reservation,
      price,
      created_date,
    });
    res.status(StatusCodes.CREATED).json({
      message: "Meal created successfully",
      meal: req.body,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

//router to get meals by ID
mealsRouter.get("/meals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // use first() to get the first meal with the given id
    const meal = await connection("meal").select().where({ id }).first();
    // check if meal is not exists
    if (!meal) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Meal not found",
      });
    }
    console.log(meal);
    res.status(StatusCodes.OK).json(meal);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});
// router to get meals by title
mealsRouter.put("/meals/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, location, when, max_reservation, price } =
    req.body;
  try {
    const updatedmeal = await connection("meal").where({ id }).update({
      title,
      description,
      location,
      when,
      max_reservation,
      price,
    });
    if (updatedmeal) {
      res.status(StatusCodes.OK).json({
        message: "Meal updated successfully",
        meal: req.body,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Meal not found",
      });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

// router to delete meal by ID
mealsRouter.delete("/meals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMeals = await connection("meal").where({ id }).del();
    if (deletedMeals) {
      res.status(StatusCodes.OK).json({
        message: "Meal deleted successfully",
        meal: deletedMeals,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Meal not found",
      });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

export default mealsRouter;
