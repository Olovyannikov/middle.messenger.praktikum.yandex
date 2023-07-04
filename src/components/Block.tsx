import { VDom } from '../jsx/h';

export const Block = ({children, ...props}: {children?: JSX.Element}) => {
	return (
		<div {...props} >
			{children}
		</div>
	);
};


