import React, {useEffect, useRef} from "react";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaFileCsv} from "react-icons/fa";
import {subscribe, unsubscribe} from "../../../../subscribe.ts";

export type TCSVFileUploadProps = {
	handleFile: (text: string) => void
	showButton?: boolean
}

export const CSVFileUpload: React.FC<TCSVFileUploadProps> = ({handleFile, showButton = true}) => {
	const hiddenFileInput = useRef<any>(null);

	const handleClick = () => {
		hiddenFileInput.current?.click();
	};

	const handleChange = (event: any) => {
		const reader = new FileReader();

		reader.onload = async (e: any) => {
			const text = (e.target.result);
			handleFile(text);
		};

		reader.readAsText(event.target.files[0]);
		event.target.value = null
	};
	useEffect(() => {
		subscribe('cards-import-csv', handleClick);

		return () => {
			unsubscribe('cards-import-csv', handleClick);
		}
	}, [handleFile]);

	return <>
		{showButton && <Button type={'primary'} onClick={handleClick} icon={<FaFileCsv/>}>
			Import from CSV file...
		</Button>}
		<input
			type="file"
			accept="text/csv"
			onChange={handleChange}
			ref={hiddenFileInput}
			style={{display: 'none'}} // Make the file input element invisible
		/>
	</>;
}
