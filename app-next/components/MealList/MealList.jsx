"use client";
import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import MealCard from "./Meal";
import api from "../../utils/api";
const MealList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
   * Fetches meals from the API and updates the state with the response data.
   *

/*******  5f549e22-fea6-40d6-9ec4-9e566f67b20b  *******/
    const fetchMeals = async () => {
      try {
        const response = await fetch(api("/meals"));
        const data = await response.json();

        setMeals(data);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2rem",
            color: "#333",
          }}
        >
          Meals
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={meal.id}>
              <MealCard meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MealList;
