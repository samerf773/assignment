// LoginPage.js

import React from 'react';
import { connect } from 'react-redux';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { login } from '../redux/actions/authActions';
import { Navigate, useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1f1f1f', 
  color: '#fff', 
  padding: 0, 
}));

const StyledFormContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[5],
  backdropFilter: 'blur(5px)', 
  textAlign: 'center',
}));

const LogoImage = styled('img')({
  width: 150, 
  height: 'auto', 
  marginBottom: 20,
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = ({ login, isAuthenticated, error }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    const { success } = await login(username, password); 
    console.log(success)
    if (success) {
      navigate('/dashboard'); 
      window.location.href('./dashboard')
    }
    setSubmitting(false); 
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <StyledContainer disableGutters maxWidth={false}>
      <StyledFormContainer>
        <LogoImage src="./logo.png" alt="Logo" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="username"
                    label="Username"
                    variant="outlined"
                    error={!!(errors.username && touched.username)}
                    helperText={touched.username && errors.username}
                    InputLabelProps={{
                      style: { fontSize: '1rem', fontWeight: 'bold', color: '#000' }, 
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    error={!!(errors.password && touched.password)}
                    helperText={touched.password && errors.password}
                    InputLabelProps={{
                      style: { fontSize: '1rem', fontWeight: 'bold', color: '#000' }, 
                    }}
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="error" align="center">
                      {error}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }} 
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </StyledFormContainer>
    </StyledContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, 
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(LoginPage);
