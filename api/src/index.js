import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import { StatusCodes } from "http-status-codes";
import connection from "./database_client.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

// Check if the database connection is successful
const connectToDatabase = async () => {
  try {
    await connection.raw("SELECT 1");
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
connectToDatabase();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
const apiRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ serve /images from public/images
app.use("/images", express.static(path.join(__dirname, "public/images")));
apiRouter.get("/future-meals", async (req, res) => {
  try {
    const futureMeals = await knex("meal")
      .select("*")
      .where(knex.ref("when"), ">", knex.fn.now());
    // check if futureMeals is not empty
    if (futureMeals) {
      console.log(futureMeals);
      res.status(StatusCodes.OK).json(futureMeals);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No future meals found",
      });
    }
  } catch (error) {
    console.error("Error fetching future meals:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});
// Router to get  all meals in the past (relative to the when datetime)
apiRouter.get("/past-meals", async (req, res) => {
  try {
    const pastMeals = await knex("meal")
      .select("*")
      .where(`when`, "<", knex.fn.now());
    // check if pastMeals is not empty
    if (pastMeals) {
      console.log(pastMeals);
      res.status(StatusCodes.OK).json(pastMeals);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No past meals found",
      });
    }
  } catch (error) {
    console.error("Error fetching past meals:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

//router to get all meals sorted by ID
apiRouter.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await knex("meal").select("*").orderBy("id", "DESC");

    res.status(StatusCodes.OK).json(allMeals);
    console.log(allMeals);
  } catch (error) {
    console.log("Error fetching all meals:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
});

// router to get first meal (meaning with the minimum id)
apiRouter.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex("meal")
      .select("*")
      .orderBy("id", "ASC")
      .first();
    res.status(StatusCodes.OK).json(firstMeal);
    console.log(firstMeal);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
    console.log("Error fetching first meal:", err);
  }
});

// router to get last meal (meaning with the maximum id)
apiRouter.get("/last-meal", async (req, res) => {
  try {
    const lastMeal = await knex("meal")
      .select("*")
      .orderBy("id", "DESC")
      .first();
    res.status(StatusCodes.OK).json(lastMeal);
    console.log(lastMeal);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
    console.log("Error fetching last meal:", err);
  }
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

// This is the router for the meals
apiRouter.use("/", mealsRouter);

// This is the router for the reservations
apiRouter.use("/", reservationsRouter);

// This is the router for the reviews
apiRouter.use("/", reviewsRouter);

// This is the main router for the API
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `API listening on port at http://localhost:${process.env.PORT}/api`
  );
});
