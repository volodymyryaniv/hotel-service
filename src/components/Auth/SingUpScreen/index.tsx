import React, { useContext, useState } from 'react';
import 'firebase/auth';
import { useAuth } from 'reactfire';
import { Formik, Form, FormikProps } from 'formik';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthBanner from '../AuthBanner';
import MyPasswordField from '../MyPasswordField';
import AuthHeader from '../AuthHeader';
import useStyles from './styles';
import SignUpFormValues from './types';
import { initialValuesNewUser, formNewUserValidation } from './validationForm';
import { UIContext } from '../../Unknown/UIContext';

const SingUpScreen: React.FC = () => {
  const styles = useStyles();
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const auth = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirm(!showConfirm);
  };

  const createNewUser = React.useCallback(
    async (data: SignUpFormValues) => {
      const { email, password, fullName } = data;
      try {
        const newUser = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await newUser.user?.updateProfile({ displayName: fullName });
        setAlert({
          show: true,
          severity: 'success',
          message: 'Welcome on board 🚀',
        });
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

  return (
    <>
      <Grid className={styles.container}>
        <Grid>
          <AuthBanner />
        </Grid>
        <div className={styles.formWrapper}>
          <Grid
            container
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <AuthHeader label="Register" />
            <Formik
              initialValues={{ ...initialValuesNewUser }}
              validationSchema={formNewUserValidation}
              validateOnChange
              onSubmit={(values: SignUpFormValues) => createNewUser(values)}
            >
              {(props: FormikProps<SignUpFormValues>) => {
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
                        <TextField
                          variant="filled"
                          name="fullName"
                          id="fullName"
                          label="Full Name"
                          value={values.fullName}
                          type="text"
                          helperText={
                            errors.fullName && touched.fullName
                              ? errors.fullName
                              : 'Enter your full name.'
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(errors.fullName)}
                          fullWidth
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
                        <MyPasswordField
                          value={values.confirmPassword}
                          name="confirmPassword"
                          label="Confirm Password"
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          error={Boolean(errors.confirmPassword)}
                          helperText={
                            errors.confirmPassword && touched.confirmPassword
                              ? errors.confirmPassword
                              : 'Re-enter password to confirm'
                          }
                          show={showConfirm}
                          handleShow={handleClickShowConfirmPassword}
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
                          Register
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
            <Typography className={styles.footer}>
              Already have an account?
            </Typography>
            <Button
              component={NavLink}
              to="/login"
              color="primary"
              className={styles.link}
            >
              Login
            </Button>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default SingUpScreen;
