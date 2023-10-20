import React from "react";
import {TwitterPicker} from 'react-color';
import {Popover} from '@headlessui/react';


export type TColorPickerProps = {
	color?: string
	onComplete: (c: any) => void
}
export const ColorPicker: React.FC<TColorPickerProps> = ({color, onComplete}) => {

	return <div>
		<Popover className="color-picker-popover">
			<Popover.Button style={{backgroundColor: color}}></Popover.Button>
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
