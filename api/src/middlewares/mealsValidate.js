//middleware to validate meal data that is sent in the request body
export const validateMeal = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ error: result.error, message: "All fields are required" });
    }
    req.validatedData = result.data; // Assign the validated data back to req.body
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(400).json({ error: error.errors || "Invalid data" });
  }
};

// middleware to validate parameters that are sent in the request params
export const validateParams = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.params);
    if (!result.success) {
      return res
        .status(400)
        .json({ error: result.error, message: "Invalid parameters" });
    }
    req.validatedParams = result.data; // Assign the validated params back to req.params
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Validation error:", error);
    return res
      .status(400)
      .json({ error: error.errors || "Invalid parameters" });
  }
};
