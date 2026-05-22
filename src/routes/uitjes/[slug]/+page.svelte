<script>
    import { enhance } from '$app/forms';
    
    // Svelte 5 Runic data opvang
    let { data } = $props();
    let uitje = data.uitje;
</script>

<main class="min-h-screen bg-[#fafafa] text-zinc-900 pb-24 relative overflow-hidden font-sans antialiased">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
        <div class="absolute top-1/3 -right-24 w-120 h-120 bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 relative z-10 w-full space-y-10">
        
        <div>
            <a href="/uitjes" class="text-zinc-500 hover:text-orange-600 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 w-fit bg-white/50 px-4 py-2 rounded-full border border-zinc-200/60 backdrop-blur-sm">
                ← Terug naar uitjes
            </a>
        </div>

        <div class="bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-stretch w-full">
            
            <div class="flex-shrink-0 w-full md:w-[320px] lg:w-[360px]"> 
                <div class="w-full h-[400px] lg:h-[450px] bg-zinc-50 border-2 border-zinc-100 rounded-[2rem] overflow-hidden relative shadow-inner">
                    <img 
                        src={uitje.coverFoto} 
                        alt={uitje.titel} 
                        style="width: 100%; height: 100%; object-fit: cover; display: block;"
                        class="hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>
            </div>

            <div class="flex flex-col justify-center text-center md:text-left flex-grow py-4 px-2 md:px-0">
                
                <span class="text-orange-500 font-black tracking-[0.25em] text-xs uppercase mb-4 block">
                    Custom Album
                </span>
                
                <h1 class="text-6xl md:text-7xl lg:text-8xl font-black text-zinc-950 uppercase tracking-tighter leading-none mb-6 drop-shadow-sm">
                    {uitje.titel}
                </h1>
                
                <p class="text-zinc-500 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto md:mx-0 mb-10">
                    Alle beelden, sterke verhalen en herinneringen van dit legendarische uitje verzameld op één plek.
                </p>

                <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-auto border-t border-zinc-100 pt-8">
                    
                    <div class="flex items-center gap-3 bg-zinc-50/80 border border-zinc-200 px-5 py-3 rounded-2xl shadow-sm">
                        <span class="text-2xl drop-shadow-sm">📍</span>
                        <div class="flex flex-col text-left">
                            <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Locatie</span>
                            <span class="text-sm font-black text-zinc-900 uppercase tracking-tight leading-none">{uitje.locatie}</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 bg-zinc-50/80 border border-zinc-200 px-5 py-3 rounded-2xl shadow-sm">
                        <span class="text-2xl drop-shadow-sm">📅</span>
                        <div class="flex flex-col text-left">
                            <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Datum</span>
                            <span class="text-sm font-black text-zinc-900 uppercase tracking-tight leading-none">{uitje.datum}</span>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>

        <div class="bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl p-6 md:p-10 relative z-0">
            <div class="flex justify-between items-center mb-8 border-b-2 border-zinc-100 pb-6">
                <h2 class="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight uppercase">Afbeeldingen</h2>
                <span class="text-xs font-bold uppercase tracking-wider text-zinc-500 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
                    {uitje.fotos?.length || 0} Foto's
                </span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                
                <form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance class="aspect-square">
                    <label class="w-full h-full bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/30 transition-all group shadow-sm">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-md border border-zinc-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <span class="text-xl">📸</span>
                        </div>
                        <span class="text-[10px] md:text-xs font-black text-zinc-700 uppercase tracking-widest">Uploaden</span>
                        
                        <input type="file" name="foto" accept="image/*" class="hidden" onchange={(e) => e.target.form.submit()} />
                    </label>
                </form>
                
                {#if uitje.fotos && uitje.fotos.length > 0}
                    {#each uitje.fotos as foto}
                        <div class="aspect-square bg-zinc-50 rounded-3xl border border-zinc-200 shadow-sm overflow-hidden relative group cursor-pointer">
                            <img 
                                src={foto.url} 
                                alt="Album foto" 
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                        </div>
                    {/each}
                {:else}
                    <div class="aspect-square bg-zinc-50/80 rounded-3xl border border-zinc-200/60 shadow-inner flex flex-col items-center justify-center text-center p-4">
                        <span class="text-2xl opacity-50 mb-2">👻</span>
                        <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Nog geen foto's</span>
                    </div>
                {/if}

            </div>
        </div>

    </div>
</main>