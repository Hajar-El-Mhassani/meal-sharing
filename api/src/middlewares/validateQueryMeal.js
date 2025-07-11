import { StatusCodes } from "http-status-codes";

export const mealQueryValidator = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.query);
    if (!result.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error, message: "Invalid query parameters" });
    }
    req.validatedMealQuery = result.data;
    next();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid query parameters",
      error: err.message,
    });
  }
};
