import axios from 'axios';
import QueryString from 'qs';
import * as utilService from '../utilities/ServiceTools';

const URL_BASE = 'http://localhost:8090/api';

export async function getCustomers(orientation, order, page) {
  const data = new FormData();

  if (orientation) {
    data.append('orientation', orientation);
  }
  if (order) {
    data.append('order', order);
  }
  if (page) {
    data.append('page', page);
  }

  const config = {
    method: 'POST',
    url: `${URL_BASE}/customers/list`,
    data: data,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export const addCustomer = async (customer) => {
  utilService.removeNullValues(customer);

  const data = QueryString.stringify(customer, { allowDots: true });

  const config = {
    method: 'POST',
    url: `${URL_BASE}/customers/add`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data,
  };

  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateCustomer = async (customer) => {
  utilService.removeNullValues(customer);

  const data = QueryString.stringify(customer, { allowDots: true });

  const config = {
    method: 'PUT',
    url: `${URL_BASE}/customers/update`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data,
  };

  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const detailCustomer = async (customerId) => {
  const config = {
    method: 'GET',
    url: `${URL_BASE}/customers/detail/${customerId}`,
  };

  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteCustomer = async (customerId) => {
  const config = {
    method: 'DELETE',
    url: `${URL_BASE}/customers/delete/${customerId}`,
  };

  return axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
