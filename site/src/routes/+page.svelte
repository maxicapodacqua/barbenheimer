<script lang="ts">
    import type { PageData } from "./$types";
    import { invalidate } from "$app/navigation";
    import Card from "$lib/Card.svelte";

    export let data: PageData;

    const intervalId = setInterval(() => {
        console.log("invalidating scoring", intervalId);
        invalidate("app:scoring");
    }, 2000);

    function stopInterval() {
        console.log("Stops interval: ", intervalId);
        clearInterval(intervalId);
    }
    async function vote(movie: "barbie" | "oppenheimer") {
        await fetch("http://localhost:3000/vote", {
            body: movie,
            method: "POST",
        });
        invalidate("app:scoring");
        return null;
    }
</script>

<div class="container mx-auto my-4">
    <div class="columns-2xl gap-5 gap-y-5">

        <Card title='Oppenheimer' imgPath="oppenheimer.jpeg"/>

        <Card title='Barbie' imgPath="barbie.webp"/>
    </div>
</div>
<!-- <div>
    votes: {JSON.stringify(data)}
</div>
<button on:click={stopInterval} class="btn">stop refresh</button>
<div class="m-2">
    <button on:click={() => vote("barbie")} class="btn btn-secondary"
        >Barbie</button
    >
    <button on:click={() => vote("oppenheimer")} class="btn btn-primary"
        >Oppenheimer</button
    >
</div> -->
