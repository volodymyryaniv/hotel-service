import React from 'react';
// import 'firebase/auth';
// import 'firebase/firestore';
// import firebase from 'firebase/app';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AppBarComponent from '../AppBarComponent';
// import { db } from '../../../common/firebaseApp';
import useStyles from './styles';

const HomeScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <AppBarComponent />
      <Button
        component={NavLink}
        to="/flats"
        variant="contained"
        color="primary"
        className={styles.link}
      >
        Explore flats
      </Button>
    </Grid>
  );
};

export default HomeScreen;
