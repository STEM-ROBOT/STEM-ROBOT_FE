import api from "../../config";
import { IMPORT_RULE_FAIL, IMPORT_RULE_REQUEST, IMPORT_RULE_SUCCESS } from "../constants/RuleConstant";

export const addRuleCompetition = (competitionId, file) => async (dispatch) => {

    try {
        dispatch({ type: IMPORT_RULE_REQUEST });
        const formData = new FormData();
        formData.append("Name", "file");
        formData.append("file", file);

        console.log(formData)
        const { data } = await api.post(`/api/Storage`, formData);
        if (data.url) {
            const { newdata } = await api.post(`/api/competitions/addRegulation/${competitionId}?filerule=${data.url}`);
            dispatch({ type: IMPORT_RULE_SUCCESS, payload: newdata });
        } else {
            console.log("ch add");
        }


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