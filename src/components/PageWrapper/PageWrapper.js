import { MainHeader } from "../MainHeader";
import { Box, Container, Grid } from "@mui/material";
import { ItemsMenu } from "../ItemsMenu";
import { MainFooter } from "../MainFooter";

export const PageWrapper = ({ children, extended }) => {
	if (extended) {
			return (
				<>
					<MainHeader />
					<Container>
						<Grid
							item
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
							sm={12}
							pt={2}
						>
							<Box gridColumn="span 2">
								<ItemsMenu />
							</Box>
							<Box gridColumn="span 10" pr={2} pl={2} pb={6}>
								{children}
							</Box>
						</Grid>
					</Container>
					<MainFooter />
				</>
			);
	}

	return (
		<>
			<MainHeader />
			<Container>
				{ children }
			</Container>
			<MainFooter />
		</>
	);
};

export const withPageWrapper = (component, props) => {
	return (
		<PageWrapper {...props}>
			{ component }
		</PageWrapper>
	);
};
