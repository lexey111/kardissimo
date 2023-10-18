import React, {useCallback} from "react";
import {MdPageview} from "react-icons/md";
import {useNavigate} from "react-router-dom";

export const PreviewCell: React.FC = (props: any) => {
	const navigate = useNavigate();

	const handleClick = useCallback(() => {
		const scrollContainer: any = window.document.scrollingElement;
		if (scrollContainer && scrollContainer?.scrollTop > 0) {
			localStorage.setItem('_list_scroll_position', scrollContainer.scrollTop);
		}

		navigate(`/collections/${props.collectionId}/cards/${props.data.id}`);
	}, []);

	return <div className={'table-button-column'}>
		<span onClick={handleClick}><MdPageview/></span>
	</div>;
}
