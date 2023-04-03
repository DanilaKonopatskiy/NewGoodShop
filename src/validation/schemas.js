import * as yup from 'yup';
import RULES from './rules';

const {
	email,
	password,
	interests,
	bornAt,
	name,
	surname,
	gender,
	isSubscribed,
} = RULES;

export const LoginSchema = yup.object().shape({
	login: email,
	password,
});

export const RegistrationSchema = yup.object().shape({
	login: email,
	password,
	interests,
	bornAt,
	name,
	surname,
	gender,
	isSubscribed,
});