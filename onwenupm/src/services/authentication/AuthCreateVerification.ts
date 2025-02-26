import {
  ApolloClient,
  ApolloError,
  gql,
  useApolloClient,
  useMutation,
} from '@apollo/client';

import {storage} from '../../../App';
import {isLoggedInVar} from '../../config/defaults/cache';

const CREATE_VERIFICATION = gql`
  mutation CreateVerification($email: String!) {
    createVerification(email: $email)
  }
`;

export const AuthCreateVerification = (
  email: string,
  onFinishLoad?: () => void,
  onError?: (error: Error) => void,
) => {
  const [createVerification, {error}] = useMutation(CREATE_VERIFICATION, {
    variables: {email},
    onCompleted: () => {
      onFinishLoad ? onFinishLoad() : null;
    },
    onError: error => (onError ? onError(error) : null),
  });

  return {error, createVerification};
};
