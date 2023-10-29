import React, {useState} from "react";
import {IoMdInformationCircle} from "react-icons/io";

export type TSceneInfoButtonProps = {
	info: JSX.Element
}
export const SceneInfoButton: React.FC<TSceneInfoButtonProps> = ({info}) => {
	const [show, setShow] = useState(false);

	return <div
		className={'scene-info'}
		onClick={() => setShow(v => !v)}
		tabIndex={1}>

		<IoMdInformationCircle/>

		<div className={'scene-info-content' + (show ? ' visible' : '')}>
			{info}
		</div>
	</div>
}
