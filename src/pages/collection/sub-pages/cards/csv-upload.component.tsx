import React, {useRef} from "react";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaFileCsv} from "react-icons/fa";

export type TCSVFileUploadProps = {
	handleFile: (text: string) => void
}

export const CSVFileUpload: React.FC<TCSVFileUploadProps> = ({handleFile}) => {
	const hiddenFileInput = useRef<any>(null);

	const handleClick = () => {
		hiddenFileInput.current?.click();
	};

	const handleChange = (event: any) => {
		const reader = new FileReader();

		reader.onload = async (e: any) => {
			const text = (e.target.result);
			console.log(text);
			handleFile(text);
		};

		reader.readAsText(event.target.files[0]);
	};

	return <>
		<Button type={'primary'} onClick={handleClick} icon={<FaFileCsv/>}>
			Import from CSV file...
		</Button>
		<input
			type="file"
			accept="text/csv"
			onChange={handleChange}
			ref={hiddenFileInput}
			style={{display: 'none'}} // Make the file input element invisible
		/>
	</>;
}
