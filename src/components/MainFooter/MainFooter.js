import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

export const MainFooter = () => {
	return (
		<Grid item sm={12} p={2} sx={{ boxShadow: '0 -2px 4px lightgray' }}>
			<Container>
				<Typography fontSize={12}>
					The company was founded on January 25, 1964, as "Blue Ribbon Sports", by Bill Bowerman and Phil Knight, and
					officially became Nike, Inc. on May 30, 1971. The company takes its name from Nike, the Greek goddess of
					victory.[7] Nike markets its products under its own brand, as well as Nike Golf, Nike Pro, Nike+, Air Jordan,
					Nike Blazers, Air Force 1, Nike Dunk, Air Max, Foamposite, Nike Skateboarding, Nike CR7,[8] and subsidiaries
					including Air Jordan and Converse.
				</Typography>
			</Container>
		</Grid>
	);
};