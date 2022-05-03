import React, { useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyles, { containerStyle } from './styles';
import ViewProps from './types';

const FlatView: React.FC<ViewProps> = ({
  isLoaded,
  latitude,
  longitude,
  getFlat,
}) => {
  const styles = useStyles();
  const mapRef = React.useRef(null);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      getFlat(id);
    }
  }, [getFlat, id]);

  const onLoad = React.useCallback(
    function callback(maps) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: latitude,
        lng: longitude,
      });
      maps.fitBounds(bounds);
      mapRef.current = maps;
    },
    [latitude, longitude],
  );

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = null;
  }, []);
  return (
    <>
      <Box className={styles.box}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: latitude,
              lng: longitude,
            }}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={{
                lat: latitude,
                lng: longitude,
              }}
            />
          </GoogleMap>
        ) : (
          <Typography>Loading flats details</Typography>
        )}
      </Box>
    </>
  );
};

export default FlatView;
