import { CREATE_PAYMENT_FAIL, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_RESET, CREATE_PAYMENT_SUCCESS } from "../constants/PaymentConstant";

export const createPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
            return { loading: true };
        case CREATE_PAYMENT_SUCCESS:
            return { loading: false, success:true };
        case CREATE_PAYMENT_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_PAYMENT_RESET:
            return {};
        default:
            return state;
    }
};