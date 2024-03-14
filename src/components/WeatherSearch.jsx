import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherData from "./WeatherData"; // Component to display weather data
import { getWeatherData } from "../service/Api";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import weatherIcon from "./weather.png";
import { Input } from "@material-ui/core";

const WeatherSearch = () => {
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

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justify="center"
        // alignItems="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={8} sm={4}>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  style={{
                    width: "100%",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button type="submit" variant="contained" color="primary">
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          {weather && (
            <Card style={{ marginTop: "20px" }}>
              <CardContent style={{ height: "50vh" }}>
                <img
                  src={weatherIcon}
                  style={{ maxHeight: "40vh" }}
                  alt="weather icon"
                />
                <Typography variant="h5">{weather?.main?.temp}°C</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        {weather && (
          <Grid item xs={8} sm={4} style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Grid
                container
                item
                xs={12}
                sm={5}
                spacing={2}
                style={{ minWidth: "300px", marginRight: "4px" }}
              >
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Location</Typography>
                      <Typography>{weather?.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Wind</Typography>
                      <Typography>{weather?.wind.speed} KMPH</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Pressure</Typography>
                      <Typography>{weather?.main.pressure} Mb</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={5}
                spacing={2}
                style={{ minWidth: "300px", marginLeft: "4px" }}
              >
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Humidity</Typography>
                      <Typography>{weather?.main?.humidity} %</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Temperature</Typography>
                      <Typography>{weather?.main?.temp}°C</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Description</Typography>
                      <Typography>
                        {weather?.weather[0]?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default WeatherSearch;
