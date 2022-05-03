import React, { useContext, useState } from 'react';
import 'firebase/auth';
import { useAuth } from 'reactfire';
import { NavLink } from 'react-router-dom';
import { Formik, Form, FormikProps } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthBanner from '../AuthBanner';
import MyPasswordField from '../MyPasswordField';
import AuthHeader from '../AuthHeader';
import useStyles from './styles';
import SignInFormValues from './types';
import { initialValues, formValidation } from './validationForm';
import { UIContext } from '../../Unknown/UIContext';

const SignInScreen: React.FC = () => {
  const styles = useStyles();
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const auth = useAuth();

  const handleSignIn = React.useCallback(
    async (data: SignInFormValues) => {
      const { email, password } = data;
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch ({ message }) {
        setAlert({
          show: true,
          severity: 'error',
          message: `${message}`,
        });
      }
    },
    [setAlert, auth],
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Grid className={styles.container}>
        <Grid>
          <AuthBanner />
        </Grid>
        <div className={styles.formWrapper}>
          <Grid
            item
            container
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <AuthHeader label="Login" />
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={formValidation}
              validateOnChange
              onSubmit={(values: SignInFormValues) => handleSignIn(values)}
            >
              {(props: FormikProps<SignInFormValues>) => {
                const {
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  isSubmitting,
                } = props;
                return (
                  <Form>
                    <Grid>
                      <Grid>
                        <TextField
                          variant="filled"
                          name="email"
                          id="email"
                          label="Email"
                          value={values.email}
                          type="email"
                          helperText={
                            errors.email && touched.email
                              ? errors.email
                              : 'Enter email'
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          error={Boolean(errors.email)}
                        />
                      </Grid>
                      <Grid>
                        <MyPasswordField
                          value={values.password}
                          name="password"
                          label="Password"
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          error={Boolean(errors.password)}
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : 'Enter your password'
                          }
                          show={showPassword}
                          handleShow={handleClickShowPassword}
                        />
                      </Grid>
                      <Grid>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                        >
                          Login
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
            <Typography className={styles.footer}>
              Don`t have an account?
            </Typography>
            <Button
              component={NavLink}
              to="/register"
              color="primary"
              className={styles.link}
            >
              Register
            </Button>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default SignInScreen;
