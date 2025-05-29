export const validateBody = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ error: result.error, message: "All fields are required" });
    }
    req.validatedBody = result.data; // Assign the validated data back to req.body
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(400).json({ error: error.errors || "Invalid data" });
  }
};
