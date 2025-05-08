// src/utils/errorHandler.ts
export const errorHandler = (error: any, res: any) => {
  console.error("Error: ", error);
  res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
};
