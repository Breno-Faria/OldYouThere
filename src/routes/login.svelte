<script>
	import { auth, db } from "../db";
	import {
		GoogleAuthProvider,
		getAuth,
		signInWithPopup,
	} from "firebase/auth";
	import { goto } from "$app/navigation";
	import {
		addDoc,
		doc,
		getDoc,
		setDoc,
		collection,
	} from "firebase/firestore";

	const login = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			const user = res.user;
			console.log(user);

			const docRef = doc(db, "users", `${user.email}`);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				goto('/')
			} else {
				const usersRef = collection(db, "users");
				await setDoc(doc(usersRef, `${user.email}`), {
					groups: [],
					username: user.displayName,
					online: true,
					pfp: user.photoURL
				});
				goto('/')
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<h1>Login</h1>

<button on:click={login}>Login with Google</button>
