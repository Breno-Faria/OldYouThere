<script lang="ts">
	import {db} from '../db'
	import { doc, collection, getDocs, onSnapshot, QuerySnapshot } from "firebase/firestore"


	let groups:any = []

	onSnapshot(
		collection(db, "groups"),
		(snapshot:any) => {
			groups = snapshot.docs.map((doc:any) => {
				return {...doc.data(), id: doc.id}
			})

		} 
	)
</script>

<body>
	<div id=container>
		<div class="header"><button><a href="/"><img src="homeIcon.png" alt="home">Home</a></button>
			{#each groups as group}
				<a href="/{group.id}name{group.name}"><h5>{group.name}</h5></a>
			{/each}
		
		
		</div>
	</div>

</body>

<style>
	body
	{
		margin: 0;
	}
	a
	{
		font-family:'Times New Roman', Times, serif;
		color: black;
		text-decoration: none;
	}
	img
	{
		max-width: 100%;
		max-height: 100%;
	}

	button
	{
		width: 5%;
		height: 50%;
		margin: 0 1rem 1rem;
		background: none;
		border: 0;
		display: flex;
		flex-direction: column;
	}
	#container
	{
		display: flex;
		flex-direction: column;
		margin: 0;
	}

	.header
	{
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

<slot/>