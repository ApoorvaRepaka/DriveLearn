import React from 'react';
import {  TextField } from "@mui/material";

const FormInput = () => {
    return (
        <>
         <TextField
          size='small'
          variant="standard" 
          className='my-4'
          fullWidth
        />
        </>
    );
};

export default FormInput;