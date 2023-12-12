import { Box, Container, Grid, Link, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import InputAmout from "./components/InputAmout";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import { CurrencyContext } from "./context/CurrencyContext";

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (firstAmount) {
      setLoading(true);

      // Make a POST request to your backend API
      axios
        .post("http://localhost:8080/api/convert", {
          fromCurrency,
          toCurrency,
          amount: firstAmount,
        })
        .then((response) => {
          setResultCurrency(response.data.result);
          setError(null); // Reset error state on successful response
        })
        .catch((error) => {
          console.error(error);
          setError("Connection Error: Unable to fetch conversion data from Backend, Please connect Backend if not connected");
        })
        .finally(() => setLoading(false));
    }
  }, [firstAmount, fromCurrency, toCurrency]);

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Stay Ahead with Accurate Conversions
      </Typography>
      <Grid container spacing={2}>
        <InputAmout />
        <SelectCountry
          value={fromCurrency}
          setValue={setFromCurrency}
          label="From"
        />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <Typography>
                {firstAmount} {fromCurrency} =
              </Typography>
              <Typography
                variant="h5"
                sx={{ marginTop: "5px", fontWeight: "bold" }}
              >
                {resultCurrency} {toCurrency}
              </Typography>
            </>
          )}
        </Box>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
