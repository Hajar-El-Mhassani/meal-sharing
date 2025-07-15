import { StatusCodes } from "http-status-codes";

export const validateParamsId = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.params);
    if (!result.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: result.error, message: "Invalid parameters" });
    }
    req.validatedParamsID = result.data; // Assign the validated params back to req.params
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Validation error:", error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.errors || "Invalid parameters" });
  }
};
