import {
  ApolloClient,
  ApolloError,
  gql,
  useApolloClient,
  useMutation,
} from '@apollo/client';
import {storage} from '../../../App';

import {isLoggedInVar} from '../../config/defaults/cache';

const VERIFY_CODE = gql`
  mutation VerifyCode($email: String!, $code: String!) {
    verifyCode(email: $email, code: $code) {
      accessToken
    }
  }
`;

export interface Tokens {
  accessToken: string;
}

export const AuthVerifyCode = (
  email: string,
  code: string,
  client: any,
  onFinishLoad?: (data: Tokens) => void,
  onError?: (error: Error) => void,
) => {
  const [verifyCode, {error}] = useMutation<{
    verifyCode: Tokens;
  }>(VERIFY_CODE, {
    variables: {email, code},
    onCompleted: async data => {
      try {
        // Reset Store
        client.resetStore();

        storage.set('authAccessToken', data.verifyCode.accessToken);
        console.log(storage.getString('authAccessToken'));
        isLoggedInVar(true);
        onFinishLoad ? onFinishLoad(data.verifyCode) : null;
      } catch (error: any) {
        onError ? onError(error) : null;
      }
    },
    onError: error => (onError ? onError(error) : null),
  });

  return {error, verifyCode};
};
