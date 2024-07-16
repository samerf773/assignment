import React from 'react';
import { Container, Typography } from '@mui/material';
import DynamicForm from './DynamicForm';

const FormPage = () => {
  return (
    <Container maxWidth="md">
      <DynamicForm />
    </Container>
  );
};

export default FormPage;
