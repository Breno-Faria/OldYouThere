<script lang="ts">
	import { page } from '$app/stores'
	import {db} from '../db'
	import { doc, collection, getDoc, onSnapshot, QuerySnapshot, query, where } from "firebase/firestore"

	let groupInfo = $page.params.groupid.split("name")

	let users:any = []

	const q = query(collection(db, "users"), where("groups", "array-contains", `${groupInfo[0]}`));
	onSnapshot(
		q,
		(snapshot:any) => {
			users = snapshot.docs.map((doc:any) => {
				return {...doc.data(), id: doc.id}
			})

		} 
	)

	let group:any = []
	const unsub = onSnapshot(doc(db, "groups", "wneFZQ0IXXT5urluw4eS"), (doc) => {
    console.log("Current data: ", doc.data());
	return group = {...doc.data()}
});


</script>

<body>
	<div id="container">
		{groupInfo[1]}
		admin: {group.admin}
		
		<div id="users">
			{#each users as user}
				<h5>{user.name}</h5>
				{#if user.online}
					online
				{:else}
					offline
				{/if}
			{/each}
	   </div>
	</div>
</body>

<style>

</style>