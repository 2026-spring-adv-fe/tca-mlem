import { useState, useEffect, useRef } from "react";

import localforage from "localforage";


/*
	Login Props
*/
type LoginProps = {
	playerEmail: string,
	setPlayerEmail: (e: string) => void,
	setShowLogin: (l: boolean) => void,
};


/*
	Login Component
*/
export const Login: React.FC<LoginProps> = ({ playerEmail, setPlayerEmail, setShowLogin }) => {
	const [email, setEmail] = useState<string>();
	const dialogRef = useRef<HTMLDialogElement>(null);


	/*
		Closes the modal after providing a name
	*/
	const closeModal = async () => {
		if (email) {
			const result = await localforage.setItem<string>(
				'email',
				email,
			);

			setPlayerEmail(result);
		}

		// Reset show login state
		setShowLogin(false);

		// Close the modal
		dialogRef.current?.close();
	}


	/*
		Open the modal when the app loads
	*/
	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);

	return (
		<>
		<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle text-center">
			<div className="modal-box">
				<form
					onSubmit={ (e) => {
						// Prevent page reload
						e.preventDefault();

						// Close the modal
						closeModal();
					}}
				>
					<h3 className="font-bold text-lg">What is your email?</h3>

					<input type="text"
						className="input mt-3 mb-1.5"
						placeholder="foobar@gmail.com"
						value={ email ?? playerEmail }
						onChange={ (e) => setEmail(e.target.value) }
					/>

					<button type="submit" className="btn bg-purple-900 text-white mt-3">
						Save Email
					</button>

					<button
						className="btn btn-error text-white mt-3 ml-3"
						onClick={ () => closeModal() }
					>
							Cancel
					</button>
				</form>
			</div>
		</dialog>
		</>
	);
}