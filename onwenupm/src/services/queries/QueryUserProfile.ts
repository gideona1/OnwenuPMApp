import {useQuery, gql} from '@apollo/client';
import {Alert} from 'react-native';
import {UserProfileData} from '../../types';
import {QueryVerifyUser} from './QueryVerifyUser';

export interface getUserData {
  getUser: UserProfileData;
}

export const GET_USER_PROFILE = gql`
  query GetUser {
    getUser {
      balance
      id
      email
      name
      phoneNumber
      propertyID
      userType
      rentMonthly
    }
  }
`;

export const QueryUserProfile = (onError?: (error: Error) => void) => {
  const {loading, data, error, refetch} = useQuery<getUserData>(
    GET_USER_PROFILE,
    {
      onError: error => (onError ? onError(error) : null),
    },
  );

  return {loading, data, error, refetch};
};
