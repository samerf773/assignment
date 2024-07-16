import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  CircularProgress,
  IconButton,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  fetchUsers,
  editUser,
  deleteUser,
  addUser,
} from '../../redux/actions/userActions';
import Layout from '../Layout';

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); 
  const [editingId, setEditingId] = useState(null); 
  const [editedUserData, setEditedUserData] = useState({}); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmUserId, setConfirmUserId] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditStart = (userId) => {
    setEditingId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setEditedUserData({ ...userToEdit });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditedUserData({});
  };

  const handleEditSave = async (userId) => {
    setLoading(true);
    try {
      await dispatch(editUser(userId, editedUserData));
      setLoading(false);
      setSnackbarMessage('User updated successfully');
      setSnackbarType('success');
      setSnackbarOpen(true);
      setEditingId(null);
      setEditedUserData({});
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error('Error editing user', error);
      setLoading(false);
      setSnackbarMessage('Failed to update user');
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await dispatch(deleteUser(userId));
      setLoading(false);
      setSnackbarMessage('User deleted successfully');
      setSnackbarType('success');
      setSnackbarOpen(true);
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user', error);
      setLoading(false);
      setSnackbarMessage('Failed to delete user');
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    nbrServicesSub: 0,
    age: 0,
  });

  const uniqueUsers = Array.from(new Set(users.map((user) => user.id))).map(
    (id) => {
      return users.find((user) => user.id === id);
    }
  );

  const handleAddUser = async () => {
    setLoading(true);
    try {
      await dispatch(addUser(newUser));
      setLoading(false);
      setSnackbarMessage('User added successfully');
      setSnackbarType('success');
      setSnackbarOpen(true);
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        nbrServicesSub: 0,
        age: 0,
      });
    } catch (error) {
      console.error('Error adding user', error);
      setLoading(false);
      setSnackbarMessage('Failed to add user');
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isEditing = (userId) => userId === editingId;

  const handleFieldChange = (field, value) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleModalOpen = (userId) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleConfirmDialogOpen = (action, userId) => {
    setConfirmAction(action);
    setConfirmUserId(userId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setConfirmAction('');
    setConfirmUserId('');
  };

  const handleConfirmAction = () => {
    if (confirmAction === 'delete') {
      handleDeleteUser(confirmUserId);
    } else if (confirmAction === 'edit') {
      handleEditSave(confirmUserId);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueUsers.map((user, index) => (
                  <TableRow key={user.id || index}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">
                      {isEditing(user.id) ? (
                        <TextField
                          value={editedUserData.firstName || ''}
                          onChange={(e) =>
                            handleFieldChange('firstName', e.target.value)
                          }
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        user.firstName
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEditing(user.id) ? (
                        <TextField
                          value={editedUserData.lastName || ''}
                          onChange={(e) =>
                            handleFieldChange('lastName', e.target.value)
                          }
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        user.lastName
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEditing(user.id) ? (
                        <TextField
                          value={editedUserData.email || ''}
                          onChange={(e) =>
                            handleFieldChange('email', e.target.value)
                          }
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEditing(user.id) ? (
                        <TextField
                          value={editedUserData.phone || ''}
                          onChange={(e) =>
                            handleFieldChange('phone', e.target.value)
                          }
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        user.phone
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEditing(user.id) ? (
                        <div>
                          <IconButton
                            onClick={() =>
                              handleConfirmDialogOpen('edit', user.id)
                            }
                            disabled={loading}
                          >
                            <SaveIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={handleEditCancel} disabled={loading}>
                            <CancelIcon color="error" />
                          </IconButton>
                        </div>
                      ) : (
                        <div>
                          <IconButton
                            onClick={() =>
                              handleConfirmDialogOpen('delete', user.id)
                            }
                            disabled={loading}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditStart(user.id)}
                            disabled={loading}
                          >
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleModalOpen(user.id)}
                            disabled={loading}
                          >
                            <InfoIcon color="primary" />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="First Name"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
                disabled={loading}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
                disabled={loading}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                disabled={loading}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
                disabled={loading}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={newUser.address}
                onChange={handleInputChange}
                disabled={loading}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number of Services Subscribed"
                name="nbrServicesSub"
                type="number"
                value={newUser.nbrServicesSub}
                onChange={handleInputChange}
                disabled={loading}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={newUser.age}
                onChange={handleInputChange}
                disabled={loading}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleAddUser}
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {loading && (
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Grid>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          style: {
            backgroundColor: snackbarType === 'success' ? '#4caf50' : '#f44336',
          },
        }}
      />
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <Typography variant="subtitle1">
                <strong>ID:</strong> {selectedUser.id}
              </Typography>
              <Typography variant="subtitle1">
                <strong>First Name:</strong> {selectedUser.firstName}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Last Name:</strong> {selectedUser.lastName}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Phone:</strong> {selectedUser.phone}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Address:</strong> {selectedUser.address}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Age:</strong> {selectedUser.age}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Number of Services Subscribed:</strong>{' '}
                {selectedUser.nbrServicesSub}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {confirmAction} this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UserManagementPage;
