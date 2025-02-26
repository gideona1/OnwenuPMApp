import {useQuery, gql} from '@apollo/client';
import {Payment} from '../../types';

export interface GetPastDuePaymentInfo {
  getPastDuePaymentInfo: Payment[];
}

export const GET_PASTDUE_PAYMENT_INFO = gql`
  query GetPastDuePaymentInfo {
    getPastDuePaymentInfo {
      owner
      paymentIntent {
        amount
        status
        id
      }
      dueDate
      id
    }
  }
`;

export const PaymentGetPastDue = (onError?: (error: Error) => void) => {
  const {loading, data, error, refetch} = useQuery<GetPastDuePaymentInfo>(
    GET_PASTDUE_PAYMENT_INFO,
    {
      onError: error => (onError ? onError(error) : null),
    },
  );

  return {loading, data, error, refetch};
};
