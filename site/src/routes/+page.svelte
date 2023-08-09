<script lang="ts">
    import type { PageData } from "./$types";
    import { invalidate } from "$app/navigation";

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
    <div class="flex w-full">
        <div
            class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
        >
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img class="h-44" src="oppenheimer.jpeg" alt="Oppenheimer" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Oppenheimer</h2>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Vote!</button>
                    </div>
                </div>
            </div>

        </div>
        <div class="divider divider-horizontal">OR</div>
        <div
            class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
        >

        <div class="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img class="h-44" src="barbie.webp" alt="Barbie" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Barbie</h2>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Vote!</button>
                </div>
            </div>
        </div>
        

        </div>
    </div>
</div>
<div>
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
</div>
