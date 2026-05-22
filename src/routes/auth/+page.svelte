<script>
    import { enhance } from '$app/forms'; // Dit lost je refresh probleem op!
    let { data, form } = $props();
</script>

<div class="min-h-screen bg-zinc-50 flex flex-col justify-center items-center p-4 font-black uppercase tracking-widest">
    <div class="bg-white border-4 border-zinc-950 rounded-3xl p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
        
        <h1 class="text-2xl text-orange-500 mb-4">Bijna binnen...</h1>
        <p class="text-xs text-zinc-600 mb-6 normal-case font-medium tracking-normal">
            Klik op de knop hieronder om veilig de Keet-omgeving te openen.
        </p>

        {#if form?.message}
            <p class="text-red-600 text-xs mb-4 p-2 border-2 border-red-600 bg-red-50 rounded-lg normal-case font-bold tracking-normal">
                {form.message}
            </p>
            <a href="/inloggen" class="block w-full bg-zinc-950 text-white p-3 border-2 border-zinc-950 rounded-xl hover:bg-zinc-800 transition-colors text-sm">
                Nieuwe link aanvragen
            </a>
        {:else}
            <form method="POST" use:enhance>
                <input type="hidden" name="token" value={data.token} />
                <button type="submit" class="w-full bg-zinc-950 text-white p-4 border-2 border-zinc-950 rounded-xl hover:bg-orange-500 hover:text-zinc-950 transition-all shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] active:translate-x-1 active:translate-y-1 active:shadow-none text-sm">
                    Bevestig Inloggen 🍻
                </button>
            </form>
        {/if}

    </div>
</div>