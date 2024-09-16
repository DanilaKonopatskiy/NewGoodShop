const RULES_MESSAGES = {
	required: 'This filed is required',
	email: 'Use correct email',
	min: (num) => `More than ${num} symbols`,
	max: (num) => `Less than ${num} symbols`,
	interests: 'Choose minimum 2 interests',
};

export default RULES_MESSAGES;