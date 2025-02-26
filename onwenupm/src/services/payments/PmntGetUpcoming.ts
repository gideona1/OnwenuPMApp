import {useQuery, gql} from '@apollo/client';
import {Payment} from '../../types';

export interface getUpcomingPaymentInfoData {
  getUpcomingPaymentInfo: Payment;
}

export const GET_UPCOMING_PAYMENT_INFO = gql`
  query GetUpcomingPaymentInfo {
    getUpcomingPaymentInfo {
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

export const PaymentGetUpcoming = (onError?: (error: Error) => void) => {
  const {loading, data, error, refetch} = useQuery<getUpcomingPaymentInfoData>(
    GET_UPCOMING_PAYMENT_INFO,
    {
      onError: error => (onError ? onError(error) : null),
    },
  );

  return {loading, data, error, refetch};
};
