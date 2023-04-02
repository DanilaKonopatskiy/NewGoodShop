import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const Protection = ({
	requiresAuth,
	goToIfProtected,
	children,
	...props
}) => {
	const navigate = useNavigate();
	const { isAuthed } = useSelector((state) => state.auth);

	useEffect(() => {
		if (requiresAuth && !isAuthed) {
			return navigate(goToIfProtected || '/login');
		} else if (!requiresAuth && ('only' in props) && isAuthed) {
			return navigate(goToIfProtected || '/');
		}
	}, []);

	return children;
};