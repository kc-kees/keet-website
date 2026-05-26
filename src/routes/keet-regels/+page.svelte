<script>
    import { enhance } from '$app/forms';
    let { data, form } = $props();
</script>

<main class="min-h-screen bg-white text-zinc-900 pb-24 relative overflow-hidden">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
        <div class="absolute top-1/3 -right-24 w-120 h-120 bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        <div class="absolute bottom-1/4 -left-24 w-md h-112 bg-orange-100 rounded-full mix-blend-multiply filter blur-[90px] opacity-30"></div>
    </div>

    <section class="max-w-4xl mx-auto px-6 pt-16 relative z-10 w-full">
        
        <div class="mb-12 border-b border-zinc-100 pb-8">
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900">
                Het <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Wetboek</span>
            </h1>
            <p class="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                Bindende voorwaarden voor toegang tot de Keet
            </p>
        </div>

        {#if data.isAdmin}
            <div class="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-12 shadow-sm">
                <h2 class="text-lg font-black text-orange-600 mb-4 uppercase tracking-widest">Nieuwe Wet Toevoegen (Admin)</h2>
                
                {#if form?.message}
                    <p class="text-red-600 text-sm mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        {form.message}
                    </p>
                {/if}

                <form method="POST" action="?/voegRegelToe" use:enhance class="flex flex-col gap-4">
                    <input 
                        type="text" 
                        name="titel" 
                        placeholder="Titel van de wet (bijv. Afsluiten)" 
                        required 
                        class="p-3 border border-zinc-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                    <textarea 
                        name="tekst" 
                        placeholder="De volledige omschrijving van de wet..." 
                        required 
                        rows="3"
                        class="p-3 border border-zinc-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
                    ></textarea>
                    <button type="submit" class="bg-zinc-900 text-white px-6 py-3 rounded-xl hover:bg-orange-500 transition-colors font-bold self-start">
                        Wet Vastleggen
                    </button>
                </form>
            </div>
        {/if}

        <div class="space-y-6">
            {#if data.regels.length === 0}
                <div class="text-center p-8 bg-zinc-50 border border-zinc-200 rounded-2xl">
                    <p class="text-zinc-500 font-medium">Het wetboek is momenteel leeg. Het is hier nog het wilde westen.</p>
                </div>
            {:else}
                {#each data.regels as regel, index}
                    <div class="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow relative group">
                        
                        <div class="bg-white border border-zinc-200 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                            <span class="font-black text-xl text-orange-600">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                        
                        <div class="flex-1">
                            <h2 class="text-2xl font-black text-zinc-900 mb-2 tracking-tight">{regel.titel}</h2>
                            <p class="text-zinc-600 text-lg leading-relaxed whitespace-pre-line">
                                {regel.tekst}
                            </p>
                        </div>

                        {#if data.isAdmin}
                            <form 
                                method="POST" 
                                action="?/verwijderRegel" 
                                use:enhance 
                                onsubmit={(e) => { 
                                    if (!confirm(`Weet je zeker dat je de wet '${regel.titel}' wilt schrappen?`)) {
                                        e.preventDefault();
                                    }
                                }}
                                class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <input type="hidden" name="id" value={regel.id} />
                                <button type="submit" title="Verwijder wet" class="text-red-400 hover:text-red-600 transition-colors p-2 bg-white rounded-lg border border-red-100 hover:border-red-300 shadow-sm">
                                    ✖
                                </button>
                            </form>
                        {/if}

                    </div>
                {/each}
            {/if}
        </div>

    </section>
</main>