import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Dialog} from "@headlessui/react";
import {CloseCross} from "./close-cross.component.tsx";

export type TModalProps = {
	open: boolean
	type: 'normal' | 'danger'
	onClose: () => void
	title?: string | JSX.Element
	description?: string | JSX.Element
	sideElement?: any
	body?: string | JSX.Element
	actions?: string | JSX.Element

}
export const Modal: React.FC<TModalProps> = (props) => {
	return <AnimatePresence>
		{props.open && (
			<Dialog
				static
				as={'div'}
				open={props.open}
				onClose={props.onClose}
			>
				<motion.div
					className="dialog-backdrop"
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
						transition: {
							ease: "easeOut",
							duration: 0.5,
						},
					}}
					exit={{
						opacity: 0,
						transition: {
							ease: "easeIn",
							duration: 0.2,
						},
					}}
				></motion.div>

				<motion.div
					className={'dialog-fullscreen' + (' modal-' + props.type)}
					initial={{
						opacity: 0,
						scale: 0.75,
					}}
					animate={{
						opacity: 1,
						scale: 1,
						transition: {
							ease: "easeOut",
							duration: 0.15,
						},
					}}
					exit={{
						opacity: 0,
						scale: 0.75,
						transition: {
							ease: "easeIn",
							duration: 0.15,
						},
					}}
				>
					<div className={'close-cross'}>
						<CloseCross onClick={props.onClose}/>
					</div>

					<div className={'dialog-content-wrapper'}>
						<Dialog.Title></Dialog.Title>
						{!!props.title && <div className={'dialog-title'}>{props.title}</div>}

						{!!props.description && <div className={'dialog-description'}>
							{props.description}
						</div>}

						{!!props.sideElement && <div className={'dialog-side-panel'}>{props.sideElement}</div>}

						<div className="dialog-content">
							{!!props.body && <div className={'dialog-body'}>
								{props.body}
							</div>}
						</div>

						{!!props.actions && <div className={'dialog-actions'}>
							{props.actions}
						</div>}
					</div>
				</motion.div>
			</Dialog>)}
	</AnimatePresence>;
}
