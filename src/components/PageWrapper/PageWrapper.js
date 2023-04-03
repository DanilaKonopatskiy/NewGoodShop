import { MainHeader } from "../MainHeader";
import { MainFooter } from "../MainFooter";
import { Container } from "@mui/material";

export const PageWrapper = ({ children }) => {
	return (
		<>
			<MainHeader />
			<Container fluid>
				{ children }
			</Container>
			<MainFooter />
		</>
	);
};

export const withPageWrapper = (component) => {
	return (
		<PageWrapper>
			{ component }
		</PageWrapper>
	);
};
