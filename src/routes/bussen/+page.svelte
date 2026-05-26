<script>
    import { enhance } from '$app/forms';
    let { data, form } = $props();
</script>

<div class="min-h-screen bg-zinc-50 flex flex-col items-center p-4 pt-12 pb-24">
    <div class="text-center mb-8 uppercase tracking-widest font-black">
        <h1 class="text-4xl text-orange-500 mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Bussen Leaderboard
        </h1>
        <p class="text-xs text-zinc-600 normal-case font-medium tracking-normal">
            Wie zit er standaard in de bus?
        </p>
    </div>

    {#if data.isIngelogd}
        <div class="bg-white border-4 border-zinc-950 rounded-3xl p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
            <h2 class="text-xl text-orange-500 font-black uppercase tracking-widest mb-4">Nieuwe Speler Toevoegen</h2>
            
            {#if form?.message}
                <p class="text-red-600 text-xs mb-4 p-2 border-2 border-red-600 bg-red-50 rounded-lg normal-case font-bold tracking-normal">
                    {form.message}
                </p>
            {/if}

            <form method="POST" action="?/voegSpelerToe" use:enhance class="flex gap-4">
                <input 
                    type="text" 
                    name="naam" 
                    placeholder="Naam (bijv. Kaylan)" 
                    required 
                    class="p-3 border-2 border-zinc-950 rounded-xl focus:outline-none focus:border-orange-500 text-sm normal-case flex-1"
                />
                <button type="submit" class="bg-zinc-950 text-white px-6 py-3 border-2 border-zinc-950 rounded-xl hover:bg-orange-500 hover:text-zinc-950 transition-all font-black uppercase text-sm">
                    Voeg toe
                </button>
            </form>
        </div>
    {/if}

    <div class="bg-white border-4 border-zinc-950 rounded-3xl p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        <ul class="flex flex-col gap-4">
            {#if data.spelers.length === 0}
                <li class="text-center p-4 text-sm text-zinc-500 normal-case font-medium">
                    Nog niemand op het leaderboard! Voeg snel een speler toe. 🍻
                </li>
            {:else}
                {#each data.spelers as speler, index}
                    <li class="flex items-center justify-between p-4 border-2 border-zinc-950 rounded-xl bg-zinc-50 hover:bg-orange-100 transition-colors">
                        
                        <div class="flex items-center gap-4 font-black uppercase tracking-widest">
                            <span class="text-2xl w-8 text-center">
                                {#if index === 0} 🥇 
                                {:else if index === 1} 🥈 
                                {:else if index === 2} 🥉 
                                {:else} <span class="text-lg text-zinc-500">#{index + 1}</span> {/if}
                            </span>
                            
                            <span class="text-zinc-950 truncate max-w-30 sm:max-w-50">
                                {speler.naam}
                            </span>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="bg-orange-500 border-2 border-zinc-950 rounded-lg px-4 py-2 text-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center min-w-12">
                                {speler.bussenCount}x
                            </div>
                            
                            {#if data.isIngelogd}
                                <form method="POST" action="?/minEen" use:enhance>
                                    <input type="hidden" name="id" value={speler.id} />
                                    
                                    <button type="submit" class="bg-zinc-200 text-zinc-950 h-10 w-10 flex items-center justify-center border-2 border-zinc-950 rounded-lg hover:bg-zinc-300 transition-all font-black text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                                        -
                                    </button>
                                </form>

                                <form method="POST" action="?/plusEen" use:enhance>
                                    <input type="hidden" name="id" value={speler.id} />
                                    
                                    <button type="submit" class="bg-zinc-950 text-white h-10 w-10 flex items-center justify-center border-2 border-zinc-950 rounded-lg hover:bg-orange-500 hover:text-zinc-950 transition-all font-black text-xl shadow-[2px_2px_0px_0px_rgba(249,115,22,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                                        +
                                    </button>
                                </form>
                            {/if}

                            {#if data.isAdmin}
                                <form 
                                    method="POST" 
                                    action="?/verwijderSpeler" 
                                    use:enhance 
                                    onsubmit={(e) => { 
                                        if (!confirm(`Weet je zeker dat je ${speler.naam} wilt verwijderen?`)) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <input type="hidden" name="id" value={speler.id} />
                                    
                                    <button type="submit" title="Verwijder {speler.naam}" class="bg-red-500 text-white h-10 w-10 flex items-center justify-center border-2 border-zinc-950 rounded-lg hover:bg-red-600 transition-all font-black text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                                        ✖
                                    </button>
                                </form>
                            {/if}
                        </div>
                        
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
</div>