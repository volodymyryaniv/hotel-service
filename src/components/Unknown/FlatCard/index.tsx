import React from 'react';
import 'firebase/auth';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CardMedia from '@mui/material/CardMedia';
import { FlatCardProps } from './types';
import useStyles from './styles';

const FlatCard: React.FC<FlatCardProps> = ({
  id,
  activeId,
  address,
  latitude,
  longitude,
  cityName,
  description,
  dailyPriceUsd,
  photoUrl,
  publishedAt,
  setCenter,
  value,
}) => {
  const styles = useStyles();
  const match = useRouteMatch();
  const isActive = activeId === id ? styles.wrapperActive : styles.wrapper;
  const path = value ? `city=${value}` : '';
  return (
    <Grid className={isActive}>
      <ListItem className={styles.container}>
        <ListItemAvatar className={styles.imageBox}>
          <CardMedia
            component="img"
            alt="The house from the log page"
            src={photoUrl}
            className={styles.image}
          />
        </ListItemAvatar>
        <Grid className={styles.textBox}>
          <Typography className={styles.price}>
            {`$${dailyPriceUsd} / night`}
          </Typography>
          <ListItemText
            className={styles.location}
            primary={address}
            secondary={
              <Box>
                <Typography className={styles.descriptionText}>
                  {description}
                </Typography>
              </Box>
            }
          />
          <Button
            component={NavLink}
            to={{
              pathname: `${match.url}/${id}`,
              search: path,
            }}
            variant="contained"
            color="primary"
            onClick={() => setCenter(latitude, longitude)}
            className={styles.link}
          >
            Details
          </Button>
        </Grid>
      </ListItem>
    </Grid>
  );
};

export default FlatCard;
