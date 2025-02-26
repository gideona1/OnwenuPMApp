export type TextWeight = 'thin' | 'light' | 'regular' | 'medium' | 'bold';

export interface UserProfileData {
  id: string;
  phoneNumber: string;
  email: string;
  name: string;
  rentMonthly: number;
  balance: number;
  currentPaymentIntent: string;
  customerID: string;
  propertyID: string;
  userType: string;
}

export interface Payment {
  id: string;
  paymentIntent: PaymentIntent;
  owner: string;
  dueDate: string;
}

export interface PaymentIntent {
  id: string;
  status: string;
  amount: number;
}

export interface PaymentSheet {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  publishableKey: string;
  customerDefaultInfo: UserProfileData;
}

export interface Charge {
  status: string;
  amount: number;
  created: string;
  paymentMethod: string;
  paymentLastFour: string;
  receiptNumber: string;
  receiptLink: string;
}
