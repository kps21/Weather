import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherData from "./WeatherData"; // Component to display weather data
import { getWeatherData } from "../service/Api";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import weatherIcon from "./weather.png";
import { Input } from "@material-ui/core";

const defaultCities = ["London", "New York", "Tokyo", "Paris", "Sydney"];

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getWeatherData(city);
      setWeather(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchDataForDefaultCities = async () => {
      const defaultWeatherData = [];
      for (const city of defaultCities) {
        try {
          const data = await getWeatherData(city);
          defaultWeatherData.push({ city, data });
        } catch (error) {
          console.error(
            `Error fetching weather data for ${city}: ${error.message}`
          );
        }
      }
      setWeather(defaultWeatherData);
    };
    fetchDataForDefaultCities();
  }, []);

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justify="flex-start"
        // alignItems="center"
        style={{ marginTop: "20px" }}
      >
        {weather &&
          weather.map((cityWeather, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card style={{ marginTop: "20px", maxWidth: "250px" }}>
                <CardContent style={{ height: "40vh" }}>
                  <img
                    src={weatherIcon}
                    style={{ maxHeight: "25vh" }}
                    alt="weather icon"
                  />
                  <Typography variant="h5">
                    {cityWeather.data?.main?.temp}°C
                  </Typography>
                  <Typography variant="h6">{cityWeather.city}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
