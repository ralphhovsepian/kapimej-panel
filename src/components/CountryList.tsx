import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

type Country = {
  country_name: string;
  flag_code: string;
};

type CountryListProps = {
  countries: Country[];
  onCountrySelect: (country: string) => void;
};

const CountryList: React.FC<CountryListProps> = ({ countries, onCountrySelect }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Select a Country
      </Typography>
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.country_name}>
            <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <CardActionArea onClick={() => onCountrySelect(country)}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                      {country.country_name.charAt(0).toUpperCase() + country.country_name.slice(1)}
                    </Typography>
                    <ReactCountryFlag 
                      countryCode={country.flag_code} 
                      style={{ fontSize: '2.5em' }} 
                      svg 
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CountryList;
