import axios from 'axios';
import queryString from 'query-string';
import { IdentityCardInterface, IdentityCardGetQueryInterface } from 'interfaces/identity-card';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getIdentityCards = async (
  query?: IdentityCardGetQueryInterface,
): Promise<PaginatedInterface<IdentityCardInterface>> => {
  const response = await axios.get('/api/identity-cards', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createIdentityCard = async (identityCard: IdentityCardInterface) => {
  const response = await axios.post('/api/identity-cards', identityCard);
  return response.data;
};

export const updateIdentityCardById = async (id: string, identityCard: IdentityCardInterface) => {
  const response = await axios.put(`/api/identity-cards/${id}`, identityCard);
  return response.data;
};

export const getIdentityCardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/identity-cards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteIdentityCardById = async (id: string) => {
  const response = await axios.delete(`/api/identity-cards/${id}`);
  return response.data;
};
