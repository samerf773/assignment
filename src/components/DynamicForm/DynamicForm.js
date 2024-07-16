// DynamicForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

const paperStyle = {
  padding: '20px',
  marginTop: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '600px',
};

const formTitleStyle = {
  marginBottom: '16px',
  textAlign: 'center',
};

const submitButtonStyle = {
  marginTop: '16px',
};

const DynamicForm = () => {
  const [formData, setFormData] = useState({});

  const formConfig = {
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        required: false
      }
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Paper style={paperStyle} elevation={3}>
      <Typography variant="h5" style={formTitleStyle}>
        Dynamic Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {formConfig.fields.map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                required={field.required}
                onChange={handleChange}
                value={formData[field.name] || ''}
              />
            </Grid>
          ))}
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" type="submit" style={submitButtonStyle}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default DynamicForm;
