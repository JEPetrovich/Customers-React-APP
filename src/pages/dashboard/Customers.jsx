import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { createContext, useEffect, useRef, useState } from 'react';
import * as service from '../../services/CustomersService';
import { ModalCustomer } from '../../components/public/customers/ModalCustomer';
import { TableCustomers } from '../../components/public/customers/TableCustomers';
import { Customer } from '../../utilities/AppTools';

export const CustomersContext = createContext({});

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(new Customer());
  const [hasCustomers, setHasCustomers] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeBackdrop, setActiveBackdrop] = useState(false);
  const [success, setSuccess] = useState({ open: false, message: '' });
  const [error, setError] = useState({ open: false, message: '' });

  const defaultPageRef = useRef(0);
  const defaultOrientationRef = useRef('asc');
  const defaultOrderRef = useRef('lastName');

  const toastPosition = {
    vertical: 'top',
    horizontal: 'center',
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeBackdrop = () => {
    setActiveBackdrop(false);
  };

  const openBackdrop = () => {
    setActiveBackdrop(true);
  };

  const openSuccess = (message) => {
    success.message = message;
    setSuccess({ ...success, open: true });
  };

  const closeSuccess = () => {
    setSuccess({ ...success, open: false });
    success.message = '';
  };

  const openError = (message) => {
    error.message = message;
    setError({ ...error, open: true });
  };

  const closeError = () => {
    setError({ ...error, open: false });
    error.message = '';
  };

  const getCustomers = async (orientation, order, page) => {
    openBackdrop();
    defaultPageRef.current =
      defaultPageRef.current != page && page != null && page != undefined
        ? page
        : defaultPageRef.current;
    defaultOrientationRef.current =
      defaultOrientationRef.current != orientation &&
      orientation != null &&
      orientation != undefined
        ? orientation
        : defaultOrientationRef.current;
    defaultOrderRef.current =
      defaultOrderRef.current != order && order != null && order != undefined
        ? order
        : defaultOrderRef.current;
    const response = await service.getCustomers(
      defaultOrientationRef.current,
      defaultOrderRef.current,
      defaultPageRef.current
    );
    if (response?.status == 200) {
      setTotalPages(response.data.totalPages);
      setCustomers(response.data.content);
    } else {
      toast.error(response.data.message);
    }
    closeBackdrop();
  };

  useEffect(() => {
    if (hasCustomers != customers.length > 0) {
      setHasCustomers(customers.length > 0);
    }
    getCustomers();
  }, [customers.length]);

  return (
    <>
      <Button
        variant='contained'
        color='success'
        startIcon={
          <FontAwesomeIcon style={{ color: 'white' }} icon={faUserPlus} />
        }
        onClick={openModal}
      >
        Cliente
      </Button>

      <CustomersContext.Provider
        value={{
          toast: { success: openSuccess, error: openError },
          modalCustomer: { open: openModal },
          customer: customer,
          setCustomer: setCustomer,
          totalPages: totalPages,
        }}
      >
        <ModalCustomer
          open={showModal}
          onClose={closeModal}
          customers={{ reload: getCustomers }}
        />
        {hasCustomers ? (
          <TableCustomers
            customers={{ collection: customers, reload: getCustomers }}
            backdrop={{ open: openBackdrop, close: closeBackdrop }}
          />
        ) : (
          <p className='mt-4 text-slate-300'>No hay clientes cargados.</p>
        )}
      </CustomersContext.Provider>

      <Snackbar
        open={success.open}
        anchorOrigin={toastPosition}
        autoHideDuration={3000}
        onClose={closeSuccess}
      >
        <Alert onClose={closeSuccess} severity='success' sx={{ width: '100%' }}>
          {success.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error.open}
        anchorOrigin={toastPosition}
        autoHideDuration={3000}
        onClose={closeError}
      >
        <Alert onClose={closeError} severity='error' sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={activeBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};
