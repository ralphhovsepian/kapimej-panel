import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import CountryList from '../components/CountryList.tsx';
import Esims from './Esims.tsx';
import { supabase } from '../lib/supabaseClient.ts';

type Country = {
  country_name: string;
  flag_code: string;
};

const ESIMManagement: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedFlagCode, setSelectedFlagCode] = useState<string | null>(null);
  const [countryData, setCountryData] = useState<Country | null>(null);
  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data, error } = await supabase
      .from("countries")
      .select()
      .order('country_name', { ascending: true });
    if (error) {
      console.error('Error fetching countries:', error);
    } else {
      setCountries(data || []);
    }
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.country_name);
    setSelectedFlagCode(country.flag_code);
    setCountryData(country);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {selectedCountry ? (
          <Esims country={selectedCountry} onBack={handleBack} countryData={countryData} />
        ) : (
          <CountryList countries={countries} onCountrySelect={handleCountrySelect} />
        )}
      </Container>
    </Box>
  );
};

export default ESIMManagement;

