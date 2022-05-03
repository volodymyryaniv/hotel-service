import React, { useState, useEffect, useCallback } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import { useLocation, Route, useRouteMatch } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete from 'use-places-autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { db } from '../../../common/firebaseApp';
import AppBarComponent from '../AppBarComponent';
import FilterComponent from '../FilterComponent';
import FlatView from '../FlatView';
import { Flat } from '../../../../types';
import ListProp from './types';
import FlatCard from '../FlatCard';
import useStyles from './styles';
import REACT_APP_API_KEY from '../../../keys';

const FlatList: React.FC = () => {
  const styles = useStyles();
  const location = useLocation();
  const match = useRouteMatch();
  const [flats, setFlats] = useState<Flat[]>([]);
  const [filterFlats, setFilterFlats] = useState<Flat[]>(flats);
  const [centerMap, setCenterMap] = useState<ListProp>({
    lat: 0,
    lng: 0,
  });
  const activeId = location.pathname.split('/').slice(-1)[0];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_API_KEY,
    libraries: ['places'],
  });

  const {
    ready,
    value,
    suggestions: { status, data, loading },
    init,
    setValue,
    clearSuggestions,
    clearCache,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  const setCenter = (latitude: number, longitude: number) => {
    setCenterMap({
      lat: latitude,
      lng: longitude,
    });
  };

  const filterList = (filter: string) => {
    const filtering = flats.filter((flat) => {
      return flat.cityName.toLowerCase().includes(filter.toLowerCase());
    });
    setFilterFlats(filtering);
  };

  const getFlat = useCallback((id: string) => {
    db.collection('flats')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const flat = doc.data();
          setCenterMap({
            lat: flat?.latitude || 0,
            lng: flat?.longitude || 0,
          });
        }
      });
  }, []);

  const getByCity = useCallback((city: string) => {
    db.collection('flats')
      .where('cityName', '==', city)
      .limit(20)
      .get()
      .then((querySnapshot) => {
        const flatsList: Array<Flat> = [];
        querySnapshot.forEach((doc) => {
          const flat = doc.data();
          const item = {
            id: doc.id,
            address: flat.address,
            latitude: flat.latitude,
            longitude: flat.longitude,
            cityName: flat.cityName,
            description: flat.description,
            dailyPriceUsd: flat.dailyPriceUsd,
            photoUrl: flat.photoUrl,
            publishedAt: flat.publishedAt,
          };
          flatsList.push(item);
        });
        setFlats(flatsList);
      });
  }, []);

  const getByInput = useCallback((city: string) => {
    db.collection('flats')
      .orderBy('cityName')
      .startAt(city)
      .limit(20)
      .get()
      .then((querySnapshot) => {
        const flatsList: Array<Flat> = [];
        querySnapshot.forEach((doc) => {
          const flat = doc.data();
          const item = {
            id: doc.id,
            address: flat.address,
            latitude: flat.latitude,
            longitude: flat.longitude,
            cityName: flat.cityName,
            description: flat.description,
            dailyPriceUsd: flat.dailyPriceUsd,
            photoUrl: flat.photoUrl,
            publishedAt: flat.publishedAt,
          };
          flatsList.push(item);
        });
        setFlats(flatsList);
      });
  }, []);

  const getList = () => {
    db.collection('flats')
      .orderBy('publishedAt', 'desc')
      .limit(20)
      .get()
      .then((querySnapshot) => {
        const flatsList: Array<Flat> = [];
        querySnapshot.forEach((doc) => {
          const flat = doc.data();
          const item = {
            id: doc.id,
            address: flat.address,
            latitude: flat.latitude,
            longitude: flat.longitude,
            cityName: flat.cityName,
            description: flat.description,
            dailyPriceUsd: flat.dailyPriceUsd,
            photoUrl: flat.photoUrl,
            publishedAt: flat.publishedAt,
          };
          flatsList.push(item);
        });
        setFlats(flatsList);
      });
  };

  useEffect(() => {
    if (value) {
      getByCity(value.split(',')[0]);
    } else {
      getList();
    }
  }, [getByCity, value]);

  useEffect(() => {
    setFilterFlats(flats);
  }, [flats]);

  return (
    <>
      <Grid className={styles.wrapper}>
        <Grid className={styles.appContainer}>
          <AppBarComponent />
          <FilterComponent
            isLoaded={isLoaded}
            filterList={filterList}
            getByCity={getByCity}
            getByInput={getByInput}
            ready={ready}
            value={value}
            suggestions={{ status, data, loading }}
            init={init}
            setValue={setValue}
            clearSuggestions={clearSuggestions}
            clearCache={clearCache}
          />
        </Grid>
        <Box className={styles.listWrapper}>
          <Typography className={styles.label}>Flats for rent</Typography>
          <List className={styles.listContainer}>
            {flats &&
              filterFlats.map(
                ({
                  id,
                  address,
                  description,
                  dailyPriceUsd,
                  photoUrl,
                  latitude,
                  longitude,
                  cityName,
                  publishedAt,
                }) => {
                  return (
                    <FlatCard
                      key={id}
                      id={id}
                      activeId={activeId}
                      address={address}
                      description={description}
                      dailyPriceUsd={dailyPriceUsd}
                      photoUrl={photoUrl}
                      latitude={latitude}
                      longitude={longitude}
                      cityName={cityName}
                      publishedAt={publishedAt}
                      setCenter={setCenter}
                      value={value}
                    />
                  );
                },
              )}
          </List>
        </Box>
        <Grid className={styles.viewWrapper}>
          {location.pathname === match.url && (
            <Typography className={styles.flatText}>
              No flat selected
            </Typography>
          )}
          <Route path={`${match.url}/:id`}>
            <FlatView
              isLoaded={isLoaded}
              latitude={centerMap.lat}
              longitude={centerMap.lng}
              getFlat={getFlat}
            />
          </Route>
        </Grid>
      </Grid>
    </>
  );
};

export default FlatList;
