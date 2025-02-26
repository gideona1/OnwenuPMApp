import { faCheck, faChevronRight, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { GSButton, GSText } from "../../components/General";
import { useTheme } from "../../config/theme/Theme.context";
import { PaymentGetPaymentSheet } from "../../services/payments/PmntGetPaymentSheet";
import { UserProfileData } from "../../types";

export const PaymentButton = React.memo<{
    paymentId: string | undefined
    fetching?: boolean | undefined
    status?: string | undefined
    onRefresh?: () => void
    onPressOnPaidStatus?: () => void
}>(({ paymentId, fetching, status, onRefresh, onPressOnPaidStatus }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState<boolean>(false);
    const { theme } = useTheme();

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet({});

        if (error) {
            showMessage({
                message: error.code,
                description: error.message,
                type: "danger",
                duration: 5000
            });
        } else {
            showMessage({
                message: "Payment success",
                description: "You are all set for now. We are processing your payment.",
                type: "success",
                duration: 8000
            });
        }

        onRefresh ? onRefresh() : undefined;
        setLoading(false);
    };

    const createPaymentSheet = async (customerId: string, customerDetails: UserProfileData, customerEphemeralKeySecret: string, paymentIntentClientSecret: string) => {
        console.log(customerId, customerEphemeralKeySecret, paymentIntentClientSecret)
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Onwenu Property Management",
            customerId,
            customerEphemeralKeySecret,
            paymentIntentClientSecret,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: customerDetails.name,
                email: customerDetails.email
            }
        });

        if (!error) {
            openPaymentSheet();
        } else {
            setLoading(false);
            showMessage({
                message: error.code,
                description: error.message,
                type: "danger",
                duration: 5000
            });
        }
    }

    const { paymentSheet } = PaymentGetPaymentSheet(paymentId,
        async ({ customer, customerDefaultInfo, ephemeralKey, paymentIntent }) => {
            await createPaymentSheet(
                customer,
                customerDefaultInfo,
                ephemeralKey,
                paymentIntent
            );
        },
        (error) => {
            setLoading(false);
            showMessage({
                message: "Something went wrong.",
                description: error.message,
                type: "danger",
                duration: 5000
            });
        }
    );

    useEffect(() => {
    }, [])

    return (
        <>
            <GSButton
                // disabled={upcomingPayment.loading && upcomingPayment.error && !upcomingPayment.data?.getUpcomingPaymentInfo}
                onPress={() => {
                    if (status == 'succeeded' || status == 'processing') {
                        onPressOnPaidStatus ? onPressOnPaidStatus() : undefined;
                    } else {
                        setLoading(true);
                        paymentSheet();
                    }
                }}
                loading={loading || fetching}
                disabled={loading || fetching}
                weight="bold"
                icon={status === 'succeeded' ? faCheck : status === 'processing' ? faHourglassHalf : faChevronRight}
                background={status === 'succeeded' || status === 'processing' ? '#8395a7' : theme.color.accentP}
                color={"white"}
                style={{ marginTop: theme.spacing.double }}
            >{status === 'succeeded' ? 'Paid' : status === 'processing' ? 'Processing' : 'Pay'}</GSButton>
        </>
    )
})