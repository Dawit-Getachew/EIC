import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { register } from 'numeral';
import React from 'react';

export const RadioForm = (names: string[], data: string[], props: any) => {
  return (
    <FormControl className="flex-c" style={{ marginTop: 25 }}>
      <FormLabel id="demo-radio-buttons-group-label">Type of Ownership</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {data.map(item => (
          <FormControlLabel value={item} control={<Radio />} label={item} key={item} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}