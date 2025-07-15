import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";
import { validateBody } from "../middlewares/validateBody.js";
import { validateParamsId } from "../middlewares/validateParamsId.js";
import { paramsSchema } from "../schemas/paramsIdSchema.js";
import { reviewSchema, updateReviewSchema } from "../schemas/reviewSchema.js";
import { paramsReviwIdSchema } from "../schemas/paramsReviewSchema.js";

const reviewsRouter = express.Router();

//Router to get all reviews
reviewsRouter.get("/reviews", async (req, res) => {
  try {
    const reviews = await connection("review").select("*");
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
});

//Router to get all reviews for a specific meal
reviewsRouter.get(
  "/meals/:meal_id/reviews",
  validateParamsId(paramsReviwIdSchema),
  async (req, res) => {
    const { meal_id } = req.validatedParamsID;
    console.log("meal_id:", meal_id);

    try {
      const mealExists = await connection("meal")
        .where({ id: meal_id })
        .first();
      console.log(mealExists);
      if (!mealExists) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Meal not found",
        });
      }
      const reviewsMeal = await connection("review")
        .join("meal", "review.meal_id", "meal.id")
        .select(
          "meal.id as meal_id",
          "meal.title as meal_title",
          "meal.when",
          "review.title as review_title",
          "review.description as review_description",
          "review.stars",
          "review.id as review_id",
          "review.create_date"
        )
        .where("meal.id", meal_id);
      if (reviewsMeal.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "No reviews found for this meal",
        });
      }

      res.status(StatusCodes.OK).json(reviewsMeal);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }
);

//Router to get a specific review
reviewsRouter.get(
  "/reviews/:id",
  validateParamsId(paramsSchema),
  async (req, res) => {
    try {
      const { id } = req.validatedParamsId;
      const review = await connection("review")
        .select("*")
        .where({ id })
        .first();
      if (!review) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Review not found",
        });
      }
      res.status(StatusCodes.OK).json(review);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
);

//Router to update a specific review
reviewsRouter.put(
  "/reviews/:id",
  validateParamsId(paramsSchema),
  validateBody(updateReviewSchema),
  async (req, res) => {
    const { id } = req.validatedParamsID;
    try {
      const updatedData = req.validatedBody;
      const updatedReview = await connection("review")
        .where({ id })
        .update(updatedData);
      res.status(StatusCodes.OK).json(updatedReview);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
);

//Router to create a new review
reviewsRouter.post("/reviews", validateBody(reviewSchema), async (req, res) => {
  try {
    const validatedData = req.validatedBody;
    const newReview = await connection("review").insert(validatedData);
    res.status(StatusCodes.CREATED).send(newReview);
  } catch (err) {
    console.error("POST /reviews failed:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
});
reviewsRouter.delete(
  "/reviews/:id",
  validateParamsId(paramsSchema),
  async (req, res) => {
    const { id } = req.validateParamsId;
    try {
      const deletedReview = await connection("review").where({ id }).del();
      if (deletedReview) {
        res.status(StatusCodes.OK).json({
          message: "Review deleted successfully",
          review: id,
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: "Review not found",
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

export default reviewsRouter;
