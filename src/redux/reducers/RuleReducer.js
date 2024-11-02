import { IMPORT_RULE_FAIL, IMPORT_RULE_REQUEST, IMPORT_RULE_RESET, IMPORT_RULE_SUCCESS } from "../constants/RuleConstant";

export const importRuleReducer = (state = {}, action) => {
    switch (action.type) {
        case IMPORT_RULE_REQUEST:
            return { loading: true };
        case IMPORT_RULE_SUCCESS:
            return { loading: false, success:true };
        case IMPORT_RULE_FAIL:
            return { loading: false, error: action.payload };
        case IMPORT_RULE_RESET:
            return {};
        default:
            return state;
    }
};