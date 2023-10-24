import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Dialog} from "@headlessui/react";

export type TModalProps = {
	open: boolean
	type: 'normal' | 'danger'
	onClose: () => void
	title?: string | JSX.Element
	description?: string | JSX.Element
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
				<motion.div className="dialog-backdrop"
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


				<motion.div className={'dialog-fullscreen' + (' modal-' + props.type)}
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
					<Dialog.Panel className="dialog-content">
						{!!props.title && <Dialog.Title>{props.title}</Dialog.Title>}

						{!!props.description && <Dialog.Description className={'dialog-description'}>
							{props.description}
						</Dialog.Description>}

						{!!props.body && <div className={'dialog-body'}>
							{props.body}
						</div>}

						{!!props.actions && <div className={'dialog-actions'}>
							{props.actions}
						</div>}
					</Dialog.Panel>
				</motion.div>
			</Dialog>)}
	</AnimatePresence>;
}
