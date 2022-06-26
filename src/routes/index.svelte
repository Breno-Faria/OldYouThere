<script>
	import { db, auth } from "../db";
	import {
		addDoc,
		doc,
		getDoc,
		setDoc,
		collection,
	} from "firebase/firestore";
	import { getAuth } from "firebase/auth";

	let memberEmail = "";
	let newGroup = {
		groupName: "",
		users: [],
		groupImage: "",
		admin: "",
	};

	const handleSubmit = async () => {
		const auth = getAuth();
		const user = auth.currentUser
		const email = user?.email
		// @ts-ignore
		newGroup.users.push(memberEmail);
		// @ts-ignore
		newGroup.users.push(email)
		newGroup.admin += email

		await addDoc(collection(db, "groups"), newGroup)
		
	};
</script>

<main>
	<h1>New Group</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="groupName">Group Name</label>
		<input
			bind:value={newGroup.groupName}
			type="text"
			name="groupName"
			id="groupName"
		/>
		<br /><br />

		<label for="memberForm">Member Email</label>
		<input
			bind:value={memberEmail}
			type="email"
			name="memberForm"
			id="memberForm"
		/>
		<br /><br />

		<label for="groupImage">Group Image (URL)</label>
		<input
			bind:value={newGroup.groupImage}
			type="text"
			name="groupImage"
			id="groupImage"
		/>
		<br /><br />

		<input type="submit" />
	</form>
</main>

<style>
</style>
