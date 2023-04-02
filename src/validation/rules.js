import { array, boolean, number, string, date } from "yup";
import RULES_MESSAGES from "./messages";

const RULES = {
	name: string()
		.required(RULES_MESSAGES.required)
		.min(2, RULES_MESSAGES.min(2))
		.max(20, RULES_MESSAGES.max(20)),

	surname: string()
		.max(20, ''),

	email: string()
		.required(RULES_MESSAGES.required)
		.email(RULES_MESSAGES.email),

	password: string()
		.required(RULES_MESSAGES.required)
		.min(6, RULES_MESSAGES.min(6))
		.max(24, RULES_MESSAGES.max(24)),

	gender: string()
		.oneOf(['female', 'male', 'other']),

	interests: array()
		.min(2, RULES_MESSAGES.interests),

	isSubscribed: boolean(),

	bornAt: string()
		.required(RULES_MESSAGES.required),
};

export default RULES;
