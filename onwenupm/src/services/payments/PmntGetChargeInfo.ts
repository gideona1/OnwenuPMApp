import {useQuery, gql} from '@apollo/client';
import {Charge} from '../../types';

interface QueryVariables {
  paymentId: string | undefined;
}

export interface GetPaymentChargeInfo {
  getChargeInfo: Charge;
}

export const GET_PAYMENT_CHARGE_INFO = gql`
  query GetChargeInfo($paymentId: ID!) {
    getChargeInfo(paymentId: $paymentId) {
      amount
      created
      paymentLastFour
      paymentMethod
      status
      receiptLink
      receiptNumber
    }
  }
`;

export const PaymentGetChargeInfo = (
  paymentId: string | undefined,
  onError?: (error: Error) => void,
) => {
  const {loading, data, error, refetch} = useQuery<
    GetPaymentChargeInfo,
    QueryVariables
  >(GET_PAYMENT_CHARGE_INFO, {
    fetchPolicy: 'no-cache',
    skip: paymentId == '' || paymentId == null ? true : false,
    variables: {paymentId},
    onError: error => (onError ? onError(error) : null),
  });

  return {loading, data, error, refetch};
};
