import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStyles from './styles';
import MyPaswordProps from './types';

const MyPasswordField: React.FC<MyPaswordProps> = ({
  value,
  name,
  helperText,
  error,
  label,
  show,
  handleChange,
  handleBlur,
  handleShow,
}) => {
  const styles = useStyles();
  return (
    <TextField
      variant="filled"
      name={name}
      id={name}
      label={label}
      value={value}
      type={show ? 'text' : 'password'}
      helperText={helperText}
      error={error}
      onChange={handleChange}
      onBlur={handleBlur}
      fullWidth
      className={styles.textField}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShow}
              edge="end"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MyPasswordField;
