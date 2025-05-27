import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";
import {
  validateReservation,
  validateParams,
} from "../middlewares/reservationValidate.js";
import {
  reservationSchema,
  paramsSchema,
  updateReservationSchema,
} from "../schemas/reservationSchema.js";
import { validate } from "graphql";

const reservationsRouter = express.Router();

//Returns all reservations
reservationsRouter.get("/reservations", async (req, res) => {
  try {
    const reservation = await connection("reservation").select("*");
    if (reservation.length > 0) {
      res.status(StatusCodes.OK).json(reservation);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No reservation found",
      });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

//Adds a new reservation to the database
reservationsRouter.post(
  "/reservations",
  validateReservation(reservationSchema),
  async (req, res) => {
    try {
      const createdData = req.validatedData;
      //Destructure required fields from validated data
      const { contact_email, meal_id } = createdData;

      // check if the reservation already exists
      const existingReservation = await connection("reservation")
        .where({ contact_email, meal_id })
        .first();
      if (existingReservation) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "Reservation already exists",
        });
      }
      //add the reservation to the database
      const addReservation = await connection
        .insert(createdData)
        .into("reservation");
      res.status(StatusCodes.CREATED).send();
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
);

//Gets the reservation by id
reservationsRouter.get(
  "/reservations/:id",
  validateParams(paramsSchema),
  async (req, res) => {
    const { id } = req.validatedParams;
    try {
      const reservation = await connection("reservation")
        .select()
        .where({ id })
        .first();
      if (!reservation) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Meal not found",
        });
      } else {
        res.status(StatusCodes.OK).json(reservation);
      }
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
);
//Updates the reservation by id
reservationsRouter.put(
  "/reservations/:id",
  validateParams(paramsSchema),
  validateReservation(updateReservationSchema),
  async (req, res) => {
    try {
      const { id } = req.validatedData;
      const updatedData = req.validatedData;
      const updatedReservation = await connection("reservation")
        .where({ id })
        .update(updatedData);
      if (updatedReservation) {
        res.status(StatusCodes.OK).send();
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: "Reservation not found",
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

//Deletes the reservation by id
reservationsRouter.delete(
  "/reservations/:id",
  validateParams(paramsSchema),
  async (req, res) => {
    const { id } = req.validatedParams;
    try {
      const deletedReservation = await connection("reservation")
        .where({ id })
        .del();
      if (deletedReservation) {
        res.status(StatusCodes.OK).json({
          message: "Reservation deleted successfully",
          reservation: id,
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: "Reservation not found",
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
export default reservationsRouter;
