import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";

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
reservationsRouter.post("/reservations", async (req, res) => {
  try {
    const {
      number_of_guests,
      create_date,
      meal_id,
      contact_name,
      contact_phonenumber,
      contact_email,
    } = req.body;
    if (
      !number_of_guests ||
      !create_date ||
      !meal_id ||
      !contact_name ||
      !contact_phonenumber ||
      !contact_email
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required",
      });
    }
    // check if the reservation already exists
    const existingReservation = await connection("reservation")
      .where({ contact_email, meal_id, create_date })
      .first();
    if (existingReservation) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Reservation already exists",
      });
    }
    //add the reservation to the database
    const addReservation = await connection
      .insert({
        number_of_guests,
        create_date,
        meal_id,
        contact_name,
        contact_phonenumber,
        contact_email,
      })
      .into("reservation");
    res.status(StatusCodes.CREATED).json({
      message: "Reservation created successfully",
      reservation: req.body,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

//Gets the reservation by id
reservationsRouter.get("/reservations/:id", async (req, res) => {
  const { id } = req.params;
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
});
//Updates the reservation by id
reservationsRouter.put("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  const {
    number_of_guests,
    create_date,
    meal_id,
    contact_name,
    contact_phonenumber,
    contact_email,
  } = req.body;
  try {
    const updatedReservation = await connection("reservation")
      .where({ id })
      .update({
        number_of_guests,
        create_date,
        meal_id,
        contact_name,
        contact_phonenumber,
        contact_email,
      });
    if (updatedReservation) {
      res.status(StatusCodes.OK).json({
        message: "Reservation updated successfully",
        reservation: req.body,
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
});

//Deletes the reservation by id
reservationsRouter.delete("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservation = await connection("reservation")
      .where({ id })
      .del();
    if (deletedReservation) {
      res.status(StatusCodes.OK).json({
        message: "Reservation deleted successfully",
        reservation: req.body,
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
});
export default reservationsRouter;
