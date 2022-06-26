<script lang="ts">
	import { db } from "../db";
	import {
		doc,
		collection,
		getDocs,
		onSnapshot,
		QuerySnapshot,
		query,
		where,
		addDoc,
		updateDoc,
		getDoc,
	} from "firebase/firestore";
	import homeIcon from "$lib/assets/homeIcon.png";
	import {
		getAuth,
		getRedirectResult,
		GoogleAuthProvider,
		onAuthStateChanged,
	} from "firebase/auth";
	import { goto } from "$app/navigation";
	import { browser } from "$app/env";
	import { onMount } from "svelte";

	const auth = getAuth();
	let userGroups: any = [];
	let idArr: any = [];

	//checks if user is logged in, and queries their groups || redirects to login page
	onAuthStateChanged(auth, (user) => {
		if (user) {
			if (browser) {
				const user = auth.currentUser;
				const email = user?.email;
				const uid = user?.uid;
				idArr.push(email);
				idArr.push(uid);
				onSnapshot(
					query(
						collection(db, "groups"),
						where("users", "array-contains", `${email}`)
					),
					(snapshot) => {
						userGroups = snapshot.docs.map((doc) => {
							return { ...doc.data(), id: doc.id };
						});
					},
					(error) => {
						console.log(error);
					}
				);
			}
		} else {
			if (browser) {
				goto("/login");
			}
		}
	});

	const toggle = async () => {
		const userInfo = doc(db, "users", `${idArr[0]}`);
		const docSnap = await getDoc(userInfo);
		// @ts-ignore
		if (docSnap.data().online) {
			await updateDoc(userInfo, {
				"online": false
			})
		}
		else {
			await updateDoc(userInfo, {
				"online": true
			})
		}
	};
</script>

<body>
	<div id="container">
		<div class="header">
			<button class="headerButton"
				><a href="/"><img src={homeIcon} alt="home" />Home</a></button
			>
			{#each userGroups as group}
				<div class="group">
					<a href="/groups/{group.id}name{group.groupName}">
						<img src={group.groupImage} alt="group icon" />
						<p>{group.groupName}</p>
					</a>
				</div>
			{/each}
		</div>
		<button on:click={toggle} id="toggle" type="button" class="btn btn-primary btn-lg"></button>
	</div>
</body>

<slot />

<style>
	#toggle
	{
		width: 8rem;
		height: 3rem;
		background-color: lightgray;
	}
	body {
		margin: 0;
	}
	a {
		font-family: "Times New Roman", Times, serif;
		color: black;
		text-decoration: none;
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}

	.headerButton,
	.group {
		width: 5%;
		height: 50%;
		margin: 0 1rem 1rem;
		background: none;
		border: 0;
		display: flex;
		flex-direction: column;
	}
	#container {
		display: flex;
		flex-direction: column;
		margin: 0;
	}

	.header {
		min-height: 100px;
		height: 15%;
		width: 100vw;
		background-color: pink;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 5px;
	}
</style>
