import api from "/src/config";
import { GET_RULE_FAIL, GET_RULE_REQUEST, GET_RULE_SUCCESS, IMPORT_RULE_FAIL, IMPORT_RULE_REQUEST, IMPORT_RULE_SUCCESS } from "../constants/RuleConstant";
import { toast } from "react-toastify";

export const addRuleCompetition = (competitionId, file) => async (dispatch) => {
    console.log(file)
    try {
        dispatch({ type: IMPORT_RULE_REQUEST });
        const { newdata } = await api.put(`/api/competitions/addRegulation/${competitionId}`,file);
        dispatch({ type: IMPORT_RULE_SUCCESS, payload: newdata });
        toast.success("Thêm Thành Công")

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: IMPORT_RULE_FAIL,
            payload: message,
        });
    }
};
export const getRuleCompetition = (competitionId) => async (dispatch) => {

    try {
        dispatch({ type: GET_RULE_REQUEST });
        const {data}= await  api.get(`/api/competitions/get-rule?competitionId=${competitionId}`);
       
        dispatch({ type: GET_RULE_SUCCESS, payload: data });    
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: GET_RULE_FAIL,
            payload: message,
        });
    }
};