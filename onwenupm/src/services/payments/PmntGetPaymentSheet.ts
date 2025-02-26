import {gql, useMutation} from '@apollo/client';
import {PaymentSheet} from '../../types';

export const GET_PAYMENT_SHEET = gql`
  mutation PaymentSheet($paymentId: ID!) {
    paymentSheet(paymentId: $paymentId) {
      customer
      ephemeralKey
      paymentIntent
      publishableKey
      customerDefaultInfo {
        email
        name
        phoneNumber
      }
    }
  }
`;

export const PaymentGetPaymentSheet = (
  paymentId: string | undefined,
  onFinishLoad?: (data: PaymentSheet) => void,
  onError?: (error: Error) => void,
) => {
  const [paymentSheet, {data, error}] = useMutation<{
    paymentSheet: PaymentSheet;
  }>(GET_PAYMENT_SHEET, {
    variables: {paymentId},
    onCompleted: async data =>
      onFinishLoad ? onFinishLoad(data.paymentSheet) : null,
    onError: error => (onError ? onError(error) : null),
  });

  return {error, data, paymentSheet};
};
