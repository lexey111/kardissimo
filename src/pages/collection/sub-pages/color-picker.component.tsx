import React from "react";
import {TwitterPicker} from 'react-color';
import {Popover} from '@headlessui/react';


export type TColorPickerProps = {
	color?: string
	onComplete: (c: any) => void
	onFocus?: (e: any) => void
}
export const ColorPicker: React.FC<TColorPickerProps> = ({color, onComplete, onFocus}) => {
	return <div>
		<Popover className="color-picker-popover">
			<Popover.Button style={{backgroundColor: color}} onFocus={onFocus}></Popover.Button>
			<Popover.Panel className="color-picker-panel">
				<Popover.Button as={'div'}>
					<TwitterPicker
						color={color}
						onChangeComplete={onComplete}
					/>
				</Popover.Button>
			</Popover.Panel>
		</Popover>
	</div>
}
