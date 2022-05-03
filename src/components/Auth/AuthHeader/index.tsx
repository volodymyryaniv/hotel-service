import React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

const AuthHeader: React.FC<{
  label: string;
}> = ({ label }) => {
  return (
    <>
      <Box>
        <CardMedia
          component="img"
          alt="Company logo"
          src="../../../company-logo.png"
        />
      </Box>
      <Typography mb={10} variant="h3">
        {label}
      </Typography>
    </>
  );
};

export default AuthHeader;
