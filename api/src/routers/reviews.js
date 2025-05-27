import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";

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
reviewsRouter.get("/meals/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  console.log("meal_id:", meal_id);

  try {
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
});

//Router to get a specific review
reviewsRouter.get("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await connection("review").select("*").where({ id }).first();
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
});

//Router to update a specific review
reviewsRouter.put("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReview = await connection("review")
      .where({ id })
      .update(req.body);
    res.status(StatusCodes.OK).json(updatedReview);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

//Router to create a new review
reviewsRouter.post("/reviews", async (req, res) => {
  try {
    const newReview = await connection("review").insert(req.body);
    res.status(StatusCodes.CREATED).send(newReview);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
});
reviewsRouter.delete("/reviews/:id", async (req, res) => {
  const { id } = req.params;
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
});

export default reviewsRouter;
