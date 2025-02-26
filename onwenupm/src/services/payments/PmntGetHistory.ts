import {useQuery, gql} from '@apollo/client';
import {Payment} from '../../types';

export interface GetPaymentHistoryInfo {
  getPaymentHistoryInfo: Payment[];
}

export const GET_PAYMENT_HISTORY_INFO = gql`
  query GetPaymentHistoryInfo {
    getPaymentHistoryInfo {
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

export const PaymentGetHistory = (onError?: (error: Error) => void) => {
  const {loading, data, error, refetch} = useQuery<GetPaymentHistoryInfo>(
    GET_PAYMENT_HISTORY_INFO,
    {
      onError: error => (onError ? onError(error) : null),
    },
  );

  return {loading, data, error, refetch};
};
