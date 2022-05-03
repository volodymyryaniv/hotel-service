import { makeStyles } from '@mui/styles';
import defaultTheme from '../../../common/theme';

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },
  appContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  box: {
    height: 60,
    margin: 40,
  },
  listWrapper: {
    maxWidth: 589,
    marginTop: 200,
    marginLeft: 23,
    position: 'relative',
    overflow: 'hidden',
  },
  label: {
    fontSize: 35,
    fontWeight: 700,
  },
  listContainer: {
    marginTop: 80,
    overflow: 'hidden',
  },
  viewWrapper: {
    position: 'fixed',
    top: 0,
    left: 620,
    right: 0,
    bottom: 0,
    height: '100vh',
    marginBottom: 10,
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatText: {
    fontSize: 25,
    color: `${defaultTheme.palette.primary.light}`,
  },
});

export default useStyles;
