import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";
import { validateBody } from "../middlewares/validateBody.js";
import { validateParamsId } from "../middlewares/validateParamsId.js";
import { paramsSchema } from "../schemas/paramsIdSchema.js";
import { createMealSchema, updateMealSchema } from "../schemas/mealSchema.js";
import { mealQueryValidator } from "../middlewares/validateQueryMeal.js";
import { queryMealSchema } from "../schemas/queryMealSchema.js";

const mealsRouter = express.Router();

//Router to get all meals
mealsRouter.get(
  "/meals",
  mealQueryValidator(queryMealSchema),
  async (req, res) => {
    try {
      const {
        maxPrice,
        availableReservations,
        title,
        dateAfter,
        dateBefore,
        limit,
        sortKey,
        sortDir,
      } = req.validatedMealQuery;

      let query = connection("meal").select("meal.*");

      // JOIN and GROUP BY if availableReservations is used
      if (availableReservations !== undefined) {
        query
          .leftJoin("reservation", "meal.id", "reservation.meal_id")
          .groupBy("meal.id")
          .select(
            connection.raw(
              //If the sum is NULL, return 0 instead
              "COALESCE(SUM(reservation.number_of_guests), 0) as total_guests"
            )
          );

        if (availableReservations === true) {
          query.havingRaw(
            "meal.max_reservation > COALESCE(SUM(reservation.number_of_guests), 0)"
          );
        } else {
          query.havingRaw(
            "meal.max_reservation <= COALESCE(SUM(reservation.number_of_guests), 0)"
          );
        }
      }

      if (maxPrice) {
        query.where("price", "<", maxPrice);
      }

      if (title) {
        query.where("title", "ilike", `%${title}%`);
      }

      if (dateAfter) {
        query.where("when", ">", dateAfter);
      }

      if (dateBefore) {
        query.where("when", "<", dateBefore);
      }

      if (sortKey) {
        const direction = sortDir === "desc" ? "desc" : "asc";
        query.orderBy(sortKey, direction);
      }

      if (limit) {
        query.limit(limit);
      }

      const meals = await query;
      // Build full image URL for each meal

      if (meals.length > 0) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const mealsWithFullImage = meals.map((meal) => ({
          ...meal,
          image: meal.image
            ? `${baseUrl}/images/${meal.image}`
            : `${baseUrl}/images/default.jpg`,
        }));

        return res.status(StatusCodes.OK).json(mealsWithFullImage);
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "No meals found",
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

//router to get meals by ID
mealsRouter.get(
  "/meals/:id",
  validateParamsId(paramsSchema),
  async (req, res) => {
    try {
      const { id } = req.validatedParamsID;

      // 1. Get the meal by ID
      const meal = await connection("meal").where({ id }).first();
      if (!meal) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Meal not found",
        });
      }

      // 2. Get total guests already reserved for this meal
      const totalGuestsRow = await connection("reservation")
        .where({ meal_id: id })
        .sum("number_of_guests as total");

      const totalGuests = Number(totalGuestsRow[0].total) || 0;

      // 3. Calculate available reservations
      const availableReservations = meal.max_reservation - totalGuests;

      // 4. Add full image path
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      meal.image = meal.image
        ? `${baseUrl}/images/${meal.image}`
        : `${baseUrl}/images/default.jpg`;

      // 5. Add the availableReservations to the meal object
      meal.available_reservations = availableReservations;

      // 6. Return the meal
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
  validateParamsId(paramsSchema),
  validateBody(updateMealSchema),
  async (req, res) => {
    const { id } = req.validatedParamsID;
    const updateData = req.validatedBody;
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
  validateParamsId(paramsSchema),
  async (req, res) => {
    const { id } = req.validatedParamsID;
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
