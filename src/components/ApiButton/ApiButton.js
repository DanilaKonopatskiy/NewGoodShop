import { Button } from "@mui/material";
import { Loader } from "../Loader";

export const ApiButton = ({
	children,
	color = 'primary',
	variant = 'contained',
	loading = false,
	...props
}) => {
	return (
		<Button
			color={color}
			variant={variant}
			disabled={loading}
			{...props}
		>
			<span>{children}</span>
			<span className="load" style={{ height: '24.5px' }}>
				<Loader
					loading={loading}
					variant="ring"
					style={{
						transform: 'scale(0.35)',
						width: '24.5px',
						height: '24.5px',
						top: '-10px',
					}}
				/>
			</span>
		</Button>
	);
};