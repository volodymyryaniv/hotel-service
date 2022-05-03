import { makeStyles } from '@mui/styles';
import defaultTheme from '../../../common/theme';

const useStyles = makeStyles({
  filterWrapper: {
    position: 'fixed',
    top: 0,
    left: 23,
    width: 581,
    minHeight: 170,
    backgroundColor: `${defaultTheme.palette.secondary.main}`,
  },
  filterField: {
    position: 'fixed',
    top: 100,
    left: 23,
    marginBottom: 80,
    maxWidth: 580,
    zIndex: 5,
  },
  listContainer: {
    position: 'relative',
    top: 170,
    left: 0,
    overflow: 'auto',
    maxHeight: 135,
    borderRadius: 5,
    boxShadow: `1px 1px 2px ${defaultTheme.palette.primary.dark}`,
    backgroundColor: `${defaultTheme.palette.secondary.main}`,
    '&:focus': {
      outline: 'none',
    },
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: `${defaultTheme.palette.primary.light}`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${defaultTheme.palette.primary.dark}`,
      height: 20,
      borderRadius: 10,
    },
  },
});

export default useStyles;
