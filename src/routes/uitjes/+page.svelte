<script>
    let { data } = $props();
</script>

<main class="min-h-screen bg-white text-zinc-900 pb-24 relative overflow-hidden">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div class="absolute top-1/3 -right-24 w-120 h-120 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
    </div>

    <section class="max-w-6xl mx-auto px-6 pt-16 relative z-10 w-full">
        
        <div class="mb-16 border-b border-zinc-100 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
                
                <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900">
                    Hatseflats <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">On Tour</span>
                </h1>
                <p class="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                    Klik op een uitje voor het volledige fotoalbum
                </p>
            </div>

            {#if data.user?.rol === 'ADMIN'}
    <a href="/admin/nieuw-uitje" class="bg-zinc-900 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2 self-start">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Nieuw Uitje Toevoegen
    </a>
{/if}
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {#each data.uitjes as uitje}
                <a href="/uitjes/{uitje.slug}" class="bg-zinc-50 border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                    <div class="w-full aspect-video bg-zinc-200 relative overflow-hidden">
                        <img src={uitje.coverFoto} alt={uitje.titel} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <h2 class="text-2xl font-black text-zinc-900 tracking-tight mb-2 group-hover:text-amber-600 transition-colors">{uitje.titel}</h2>
                            <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                                <span>{uitje.datum}</span>
                                <span>•</span>
                                <span>{uitje.locatie}</span>
                            </div>
                        </div>
                        <span class="text-sm font-bold text-amber-600 mt-6 inline-flex items-center gap-1">
                            Bekijk album →
                        </span>
                    </div>
                </a>
            {/each}
        </div>
    </section>
</main>