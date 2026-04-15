import { useDroppable } from "@dnd-kit/react";

type DropzoneProps = {
	id: string,
	children: any;
}

export const Dropzone: React.FC<DropzoneProps> = ({ id, children }) => {
	const { ref } = useDroppable({
		id,
	});

	// Dropzone styles
	const dropzoneStyles: React.CSSProperties = {
		padding: 5,
		alignItems: 'center',
		textAlign: 'center',
	}

	return (
		<>
		<div ref={ ref } style={ dropzoneStyles }>
			{ children }
		</div>
		</>
	);
}