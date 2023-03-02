import React from 'react'
import { useState } from "react";
import { Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

const Countries = ({ register,errors }) => {
    const [selectedCountry, setSelectedCountry] = useState("");

    const selectCountryHandler = (value) => setSelectedCountry(value);

    // Have to register the languages you want to use
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);

    // Returns an object not a list
    const countryObj = countries.getNames("en", { select: "official" });

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
        label: value,
        value: key
        };
    });

    return (
        <FormControl>
        <InputLabel>Country</InputLabel>
        <Select
            label="country"
            id='country'
            name='country'
            style={{ width: "150px" }}
            value={selectedCountry}
            {...register('country')}
            error={errors.country ? true : false}
            onChange={(e) => selectCountryHandler(e.target.value)}
        >
            {!!countryArr?.length &&
            countryArr.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                {label}
                </MenuItem>
            ))}
        </Select>
        </FormControl>
    );
}

export default Countries