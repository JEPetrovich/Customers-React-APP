import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useContext, useEffect, useRef, useState } from 'react';
import * as utilDate from '../../../utilities/DateTools';
import * as service from '../../../services/CustomersService';
import { CustomersContext } from '../../../pages/dashboard/Customers';
import { Customer } from '../../../utilities/AppTools';
import dayjs from 'dayjs';

export const ModalCustomer = (props) => {
  const { open, onClose, customers } = props;

  const { toast, customer, setCustomer } = useContext(CustomersContext);

  const inputNameRef = useRef(null);
  const inputLastNameRef = useRef(null);
  const inputMailRef = useRef(null);
  const inputDateRef = useRef(null);

  const [activeBackdropInModal, setActiveBackdropInModal] = useState(false);

  const openBackdrop = () => {
    setActiveBackdropInModal(true);
  };

  const closeBackdrop = () => {
    setActiveBackdropInModal(false);
  };

  const catchValue = async (event) => {
    customer[event.target.name] = event.target.name.startsWith('date')
      ? utilDate.createDate(new Date(event.target.value))
      : event.target.value;
  };

  const addCustomer = async () => {
    openBackdrop();
    const response = await service.addCustomer(customer);
    if (response?.status == 200) {
      toast.success('Cliente agregado con éxito.');
      onClose();
      customers.reload();
    } else {
      toast.error(response.data.message);
    }
    closeBackdrop();
  };

  const updateCustomer = async () => {
    openBackdrop();
    const response = await service.updateCustomer(customer);
    if (response?.status == 200) {
      toast.success('Cliente modificado con éxito.');
      onClose();
      customers.reload();
    } else {
      toast.error(response.data.message);
    }
    closeBackdrop();
  };

  const clearInputs = () => {
    inputNameRef.current.value = '';
    inputLastNameRef.current.value = '';
    inputMailRef.current.value = '';
    inputDateRef.current.value = '';
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCustomer(new Customer());
      }, 500);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth>
        <DialogTitle
          sx={{ backgroundColor: '#2e7c33', color: 'white', m: 0, p: 2 }}
        >
          {customer?.id ? 'Editar Cliente' : 'Agregar Cliente'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex' }}>
            <TextField
              defaultValue={customer?.name}
              name='name'
              sx={{ marginTop: '.5em', marginRight: '.5em' }}
              variant='outlined'
              size='small'
              onBlur={catchValue}
              inputRef={inputNameRef}
              helperText='Nombre'
            />
            <TextField
              defaultValue={customer?.lastName}
              name='lastName'
              sx={{ marginTop: '.5em', marginRight: '.5em' }}
              variant='outlined'
              size='small'
              onBlur={catchValue}
              inputRef={inputLastNameRef}
              helperText='Apellido'
            />
            <TextField
              defaultValue={customer?.mail}
              name='mail'
              sx={{ marginTop: '.5em', marginRight: '.5em' }}
              type='email'
              variant='outlined'
              size='small'
              onBlur={catchValue}
              inputRef={inputMailRef}
              helperText='Email'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                defaultValue={
                  customer?.dateOfBirth
                    ? dayjs(
                        utilDate.formatDefaultDate(
                          new Date(customer?.dateOfBirth)
                        )
                      )
                    : undefined
                }
                name='dateOfBirth'
                sx={{ marginTop: '.5em', marginRight: '.5em' }}
                size='small'
                helperText='Fecha nacimiento'
                slotProps={{
                  textField: {
                    size: 'small',
                    helperText: 'Fecha nacimiento',
                  },
                }}
                onBlur={catchValue}
                inputRef={(input) => {
                  inputDateRef.current = input;
                }}
              />
            </LocalizationProvider>
            <Button
              sx={{ alignSelf: 'flex-start', marginTop: '.75em' }}
              onClick={clearInputs}
              color='error'
            >
              Limpiar
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ alignContent: 'space-between' }}>
          <Button onClick={onClose} variant='outlined'>
            Cancelar
          </Button>
          <Button
            onClick={customer?.id ? updateCustomer : addCustomer}
            variant='contained'
            color='success'
          >
            Guardar
          </Button>
        </DialogActions>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={activeBackdropInModal}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Dialog>
    </>
  );
};
