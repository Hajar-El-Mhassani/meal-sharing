import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import { StatusCodes } from "http-status-codes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  res.send(
    "API is working!, try to access /api/future-meals, /api/past-meals, /api/all-meals, /api/first-meal, /api/last-meal"
  );
});

//Route to get all meals in the future relative  to the current time
apiRouter.get("/future-meals", async (req, res) => {
  try {
    const futureMeals = await knex("meal")
      .select("*")
      .where(`when`, ">", knex.fn.now());
    console.log(futureMeals);
    res.status(StatusCodes.OK).json(futureMeals);
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
    console.log(pastMeals);
    res.status(StatusCodes.OK).json(pastMeals);
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
      .limit(1);
    res.status(StatusCodes.OK).json(firstMeal);
    console.log(firstMeal);
  } catch (err) {
    res.satatus(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
      .limit(1);
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

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
