<script lang="ts">
	import { page } from "$app/stores";
	import { db } from "../../db";
	import {
		doc,
		collection,
		getDoc,
		onSnapshot,
		QuerySnapshot,
		query,
		where,
		updateDoc,
		arrayUnion,
		deleteDoc,
		arrayRemove,
	} from "firebase/firestore";
	import { browser } from "$app/env";
	import { getAuth } from "firebase/auth";
	import { goto } from "$app/navigation";

	//getting group id and name, by the URI
	let groupInfo = $page.params.groupid.split("name");

	const check = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		const email = user?.email;

		const userInfo = doc(db, "users", `${email}`);
		try {
			// @ts-ignore
			await updateDoc(userInfo, {
				groups: arrayUnion(`${groupInfo[0]}`),
			});
		} catch (error) {
			console.log(error);
		}
	};

	let isAdmin: number = 0;
	const getAdmin = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		const email = user?.email;
		const docRef = doc(db, "groups", `${groupInfo[0]}`);
		const docSnap = await getDoc(docRef);
		// @ts-ignore
		const admin = docSnap.data().admin;
		if (email === admin) {
			isAdmin = 1;
		} else {
			isAdmin = -1;
			setTimeout(() => {
				isAdmin = 0;
			}, 3000);
		}
	};

	setTimeout(check, 500);

	let users: any = [];

	const q = query(
		collection(db, "users"),
		where("groups", "array-contains", `${groupInfo[0]}`)
	);
	onSnapshot(q, (snapshot: any) => {
		users = snapshot.docs.map((doc: any) => {
			return { ...doc.data(), id: doc.id };
		});
	});

	let newMemberEmail = "";
	const handleSubmit = async () => {
		const userInfo = doc(db, "groups", `${groupInfo[0]}`);
		try {
			// @ts-ignore
			console.log(groupInfo[0]);
			await updateDoc(userInfo, {
				users: arrayUnion(`${newMemberEmail}`),
			});
		} catch (error) {
			console.log(error);
		}
	};
	const deleteGroup = async () => {
		await deleteDoc(doc(db, "groups", `${groupInfo[0]}`));
		goto("/");
	};

	let removedMemberEmail = ""
	const removeMember = async () => {
		const dbRef = doc(db, "groups", `${groupInfo[0]}`)
		await updateDoc(dbRef, {
			users: arrayRemove(`${removedMemberEmail}`)
		})
		const usrRef = doc(db, "users", `${removedMemberEmail}`)
		await updateDoc(usrRef, {
			groups: arrayRemove(`${groupInfo[0]}`)
		})}
</script>

<body>
	<div id="container">
		{groupInfo[1]}

		<div id="users">
			{#each users as user}
				<div>
					<img alt="Profile Picture" src={user.pfp} />
					<h5>{user.username}</h5>
					{#if user.online}
						online
					{:else}
						offline
					{/if}
				</div>
			{/each}
		</div>
		<br />
		<button on:click={getAdmin}>Admin tools</button>
		{#if isAdmin === 1}
			<form on:submit|preventDefault={handleSubmit}>
				<label for="memberEmailForm">New user's email</label>
				<input
					bind:value={newMemberEmail}
					type="email"
					name="memberEmailForm"
					id="memberEmailForm"
				/>
				<br /><br />
				<input type="submit" />
			</form>
			<form on:submit|preventDefault={removeMember}>
				<label for="removeMemberForm">Remove member</label>
				<input bind:value="{removedMemberEmail}" type="email" placeholder="member's email" />
				<input type="submit" />
			</form>
			<button on:click={deleteGroup}
				>Delete group (PERMANENT ACTION)</button
			>
		{:else if isAdmin === -1}
			<h1>No permission!</h1>
		{/if}
	</div>
</body>

<style>
	#users {
		margin-top: 5rem;
		gap: 5rem;
		display: flex;
	}
	button
	{
		padding: 10px;
	}
</style>
