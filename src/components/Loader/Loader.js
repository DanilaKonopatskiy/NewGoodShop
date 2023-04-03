import { useState } from "react";

import './styles.css';

export const Loader = ({ loading = false, variant, style }) => {
	if (!loading) return <></>;

	const defaultLoader = 'ring';

	const LinesVariantInner = (
		<>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</>
	);

	const RingVariantInner = (
		<>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</>
	);

  const variants = {
    lines: LinesVariantInner,
    ring: RingVariantInner,
    default: LinesVariantInner,
  };

	return (
		<div
			className={variants[variant] ? variant : defaultLoader}
			style={style}
		>
			{ variants[variant] ? variants[variant] : variants.default }
		</div>
	);
};