import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";
import { validateMeal, validateParams } from "../middlewares/mealsValidate.js";
import {
  createMealSchema,
  paramsSchema,
  updateMealSchema,
} from "../schemas/mealSchema.js";

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
mealsRouter.post("/meals", validateMeal(createMealSchema), async (req, res) => {
  try {
    const createdMeal = req.validatedData;
    const addMeal = await connection("meal").insert(createdMeal);
    res.status(StatusCodes.CREATED).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

//router to get meals by ID
mealsRouter.get(
  "/meals/:id",
  validateParams(paramsSchema),
  async (req, res) => {
    try {
      const { id } = req.validatedParams;
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
  }
);
// router to get meals by title
mealsRouter.put(
  "/meals/:id",
  validateParams(paramsSchema),
  validateMeal(updateMealSchema),
  async (req, res) => {
    const { id } = req.validatedParams;
    const updateData = req.validatedData;
    try {
      const updatedMeal = await connection("meal")
        .where({ id })
        .update(updateData);
      if (updatedMeal) {
        res.status(StatusCodes.OK).send();
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
  }
);

// router to delete meal by ID
mealsRouter.delete(
  "/meals/:id",
  validateParams(paramsSchema),
  async (req, res) => {
    const { id } = req.validatedParams;
    try {
      const deletedMeal = await connection("meal").where({ id }).del();
      if (deletedMeal) {
        res.status(StatusCodes.OK).json({
          meal: id,
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
  }
);

export default mealsRouter;
