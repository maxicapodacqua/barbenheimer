<script lang="ts">
    export let imgPath: string;
    export let title: string;
</script>

 <div class="card w-full lg:card-side bg-base-100 shadow-xl">
    <figure><img class="w-98 md:h-60" src={imgPath} alt={title} /></figure>
    <div class="card-body">
      <h2 class="card-title">{title}</h2>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Vote!</button>
      </div>
    </div>
  </div>