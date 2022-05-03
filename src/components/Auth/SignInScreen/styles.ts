import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: 400,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    fontWeight: 700,
    marginTop: 170,
  },
  link: {
    fontSize: 17,
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 70,
  },
});

export default useStyles;
