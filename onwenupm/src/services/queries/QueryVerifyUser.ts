import {useQuery, gql} from '@apollo/client';
import {Alert} from 'react-native';

export const VERIFY_USER = gql`
  query VerifyUser {
    verifyUser
  }
`;

export const QueryVerifyUser = () => {
  const {loading, data, error, refetch} = useQuery(VERIFY_USER, {
    onError: error => Alert.alert(error.message),
  });

  return {loading, data, error, refetch};
};
