import React, {useCallback, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {OrbitControls, Stage} from "@react-three/drei";
import {Preview3DCard} from "./card/preview-3d-card.component.tsx";
import {Fonts} from "../../resources/fonts.ts";
import {createPortal} from "react-dom";
import {TFacesData} from "../../store/cards/types-card-face.ts";

export type TCardPreviewProps = {
	card: TFacesData
	side: number
	delay?: number
	disablePreview?: boolean
}

export const CardPreview: React.FC<TCardPreviewProps> = (
	{
		card,
		side,
		disablePreview = false,
		delay = 0
	}) => {

	const [showDelayed, setShowDelayed] = useState(delay <= 0);
	const destroying = useRef(false);
	const [fullScreen, setFullScreen] = useState(false);

	const toggleMode = useCallback(() => {
		if (disablePreview) {
			return;
		}
		setFullScreen(v => !v);
	}, [fullScreen]);

	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	useEffect(() => {
		if (delay === 0) {
			return
		}
		setTimeout(() => {
			if (!destroying.current) {
				setShowDelayed(true);
			}
		}, delay);
	}, [delay]);

	if (!card || !card.sides || card.sides.length !== 2) {
		console.error('Invalid sides array!');
		return null;
	}

	if (!card.cardboxSides || card.sides.length !== card.cardboxSides.length) {
		console.error('Invalid sides/cardboxSides arrays!');
		return null;
	}

	const faces = card.sides.map((side, idx) => {
		const color = card.cardboxSides?.[idx].color;
		const textColor = card.cardboxSides?.[idx].textColor;
		const fontSize = card.cardboxSides?.[idx].fontSize;
		const fontName = card.cardboxSides?.[idx].fontName;

		return {
			text: side.text || '',
			header: side.header || '',
			footer: side.footer || '',
			color: color || '#FDBA66',
			textColor: textColor || '#2b3b62',
			fontSize: fontSize || 'M',
			fontName: fontName || Object.keys(Fonts)[0],
		}
	});

	if (!showDelayed) {
		return null;
	}

	const content = <div
		className={'card-preview-container' + (fullScreen ? ' card-preview-fullscreen' : ' card-preview') + (delay > 0 ? ' with-delay' : '')}
		title={fullScreen || disablePreview ? '' : 'Click to preview'}
		onClick={toggleMode}>

		<div className={'preview-backdrop'}></div>

		<div className={'canvas-wrapper'}>
			<Canvas
				camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
			>

				<Stage
					adjustCamera={.9} intensity={6} preset="rembrandt"
					shadows={{type: 'contact', color: 'skyblue', colorBlend: 2, opacity: 1}}
					environment="city"
				>
					{fullScreen && <OrbitControls/>}

					<Preview3DCard
						side={fullScreen ? -1 : side}
						faces={faces}/>
				</Stage>

				<pointLight
					position={[-80, 80, 120]}
					color={'#aaa'}
					intensity={100000}/>

				<pointLight
					position={[80, -80, 200]}
					color={'#000'}
					intensity={100000}/>
			</Canvas>
		</div>
	</div>;

	if (fullScreen) {
		return createPortal(content, document.getElementById('root')!);
	}
	return content;
};
