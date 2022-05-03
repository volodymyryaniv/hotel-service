import { makeStyles } from '@mui/styles';
import defaultTheme from '../../../common/theme';

const useStyles = makeStyles({
  wrapper: {
    maxWidth: 580,
    height: 240,
    marginTop: 20,
    border: `1px solid ${defaultTheme.palette.primary.light}`,
    borderRadius: 5,
    boxShadow: `2px 2px 4px ${defaultTheme.palette.primary.dark}`,
  },
  wrapperActive: {
    maxWidth: 582,
    height: 240,
    marginTop: 20,
    border: `1px solid ${defaultTheme.palette.primary.light}`,
    borderRadius: 5,
    boxShadow: `1px 1px 2px ${defaultTheme.palette.primary.dark}`,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  imageBox: {
    width: '50%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '50%',
    height: '100%',
    paddingTop: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 25,
  },
  price: {
    fontSize: 25,
    fontWeight: 700,
  },
  location: {
    fontSize: 14,
    flexGrow: 1,
  },
  descriptionText: {
    fontSize: 12,
    maxHeight: 50,
    overflow: 'clip',
  },
  link: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 0.95,
    alignSelf: 'flex-start',
    backgroundColor: `${defaultTheme.palette.secondary.dark}`,
    color: `${defaultTheme.palette.primary.main}`,
  },
});

export default useStyles;
