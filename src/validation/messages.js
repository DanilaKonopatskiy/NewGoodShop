const RULES_MESSAGES = {
	required: 'This filed is required',
	name: '',
	surname: '',
	email: 'Use correct email',
	min: (num) => `More than ${num} symbols`,
	max: (num) => `Less than ${num} symbols`,
	gender: '',
	interests: 'Choose minimum 2 interests',
	bornAt: '',
};

export default RULES_MESSAGES;