import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import useStyles from './styles';

const AuthBanner: React.FC = () => {
  const styles = useStyles();
  return (
    <Box className={styles.box}>
      <CardMedia
        component="img"
        alt="The house from the log page"
        src="../../../hero-image.jpg"
        className={styles.image}
      />
    </Box>
  );
};

export default AuthBanner;
