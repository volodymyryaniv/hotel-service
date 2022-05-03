import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import 'firebase/auth';
import qs from 'qs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FilterProp } from './types';
import useStyles from './styles';

const FilterComponent: React.FC<FilterProp> = ({
  filterList,
  isLoaded,
  getByCity,
  getByInput,
  ready,
  value,
  suggestions: { status, data },
  init,
  setValue,
  clearSuggestions,
  clearCache,
}) => {
  const styles = useStyles();
  const history = useHistory();
  const location = useLocation();
  const query = qs.parse(location.search);
  const queryCityy = query['?city'] as string;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    getByInput(e.target.value);
    filterList(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      history.push({
        ...location,
        pathname: '/flats',
        search: `city=${value}`,
      });
      getByCity(value.split(',')[0]);
    } else {
      history.push('/flats');
    }
    clearSuggestions();
  };

  const handleSelect = (city: string, country: string) => () => {
    setValue(`${city}, ${country}`, false);
    getByCity(city);
    history.push({
      ...location,
      pathname: '/flats',
      search: `city=${city}, ${country}`,
    });
    clearSuggestions();
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const placeId = suggestion.place_id;
      const mainText = suggestion.structured_formatting.main_text;
      const secondaryText = suggestion.terms.slice(-1)[0].value;

      return (
        <ListItem key={placeId} onClick={handleSelect(mainText, secondaryText)}>
          {`${mainText},${secondaryText}`}
        </ListItem>
      );
    });

  useEffect(() => {
    if (queryCityy) {
      setValue(queryCityy);
    }
  }, [setValue, queryCityy]);

  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
      <Box className={styles.filterWrapper}>
        <TextField
          id="text"
          label="City"
          value={value}
          onChange={handleInput}
          placeholder="Type something"
          variant="filled"
          disabled={!ready}
          fullWidth
          className={styles.filterField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="show city" type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {status === 'OK' && (
          <List className={styles.listContainer}>{renderSuggestions()}</List>
        )}
      </Box>
    </form>
  );
};

export default FilterComponent;
