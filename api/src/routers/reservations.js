import express from "express";
import { StatusCodes } from "http-status-codes";
import connection from "../database_client.js";
import { validateBody } from "../middlewares/validateBody.js";
import { validateParamsId } from "../middlewares/validateParamsId.js";
import { paramsSchema } from "../schemas/paramsIdSchema.js";
import {
  reservationSchema,
  updateReservationSchema,
} from "../schemas/reservationSchema.js";

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

//Adds a new reservation to the database (create a reservation for a specific meal)
reservationsRouter.post(
  "/reservations",
  validateBody(reservationSchema),
  async (req, res) => {
    try {
      const createdData = req.validatedBody;
      //Destructure required fields from validated data
      const { contact_email, meal_id, number_of_guests } = createdData;

      //1. Check in the database if the meal with this meal_id exists
      const meal = await connection("meal").where({ id: meal_id }).first();
      if (!meal) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Meal not found",
        });
      }

      //2. get how many guests already reserve
      const total_of_existing_guests = await connection("reservation")
        .where({ meal_id })
        .sum("number_of_guests as total");

      //ensure total_of_existing_guests is not null
      const totalGuests = Number(total_of_existing_guests[0].total) || 0;
      console.log(totalGuests);
      // 3. Calculate remaining seats
      const remainingSeats = meal.max_reservation - totalGuests;
      console.log(remainingSeats);
      // 4. Check if request exceeds available seats
      if (number_of_guests > remainingSeats) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `Only ${remainingSeats} seat(s) left for this meal.`,
        });
      }
      //5. Check for duplicate reservation
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
  validateParamsId(paramsSchema),
  async (req, res) => {
    const { id } = req.validatedParamsID;
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
  validateParamsId(paramsSchema),
  validateBody(updateReservationSchema),
  async (req, res) => {
    try {
      const { id } = req.validatedParamsID;
      console.log("validatedParamsID:", req.validatedParamsID);

      const updatedData = req.validatedBody;
      //Destructure required fields from validated data
      const { contact_email, meal_id, number_of_guests } = updatedData;
      console.log("validatedBody:", updatedData);

      // Step 0: check if reservation exists
      const reservation = await connection("reservation").where({ id }).first();
      if (!reservation) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Reservation not found",
        });
      }

      // Step 1: check if meal exists (if meal_id is present)
      if (updatedData.meal_id !== undefined) {
        const meal = await connection("meal")
          .where({ id: updatedData.meal_id })
          .first();
        if (!meal) {
          return res.status(StatusCodes.NOT_FOUND).json({
            message: "Meal not found",
          });
        }

        //2. get how many guests already reserve
        const total_of_existing_guests = await connection("reservation")
          .where({ meal_id })
          .andWhereNot({ id }) // exclude the reservation being updated
          .sum("number_of_guests as total");

        //ensure total_of_existing_guests is not null
        const totalGuests = Number(total_of_existing_guests[0].total) || 0;
        console.log(totalGuests);
        // 3. Calculate remaining seats
        const remainingSeats = meal.max_reservation - totalGuests;
        console.log(remainingSeats);
        // 4. Check if request exceeds available seats
        if (number_of_guests > remainingSeats) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: `Only ${remainingSeats} seat(s) left for this meal.`,
          });
        }

        console.log({ id, contact_email, meal_id });
      }
      //update the reservation
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
  validateParamsId(paramsSchema),
  async (req, res) => {
    const { id } = req.validatedParamsID;
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
