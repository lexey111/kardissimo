import {Fonts} from "./fonts.ts";
import {ColorSchemes} from "./colors.ts";

export const FontSizeOptions: any = [
	{value: 'XXS', label: 'XXS'},
	{value: 'XS', label: 'XS'},
	{value: 'S', label: 'S'},
	{value: 'M', label: 'M'},
	{value: 'L', label: 'L'},
	{value: 'XL', label: 'XL'},
	{value: 'XXL', label: 'XXL'},
];

export const FontNameOptions = Object.keys(Fonts).map(key => {
	return {value: key, label: key};
});

export const colorSchemaOptions = Object.keys(ColorSchemes).map(key => {
	return {value: key, label: key};
});
