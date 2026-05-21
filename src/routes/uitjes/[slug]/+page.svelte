<script>
    // Svelte 5 Runic data opvang
    let { data } = $props();
    let uitje = data.uitje;
</script>

<main class="min-h-screen bg-white text-zinc-900 pb-24 relative overflow-hidden font-sans">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
        <div class="absolute top-1/3 -right-24 w-120 h-120 bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
    </div>

    <div class="max-w-6xl mx-auto px-6 pt-16 relative z-10 w-full space-y-16">
        
        

        <div class="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto gap-10 md:gap-16">
            
            <div class="flex-shrink-0 w-full max-w-[340px]">
                <div class="bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 p-4 group">
                    <div class="w-full aspect-[3/4] bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden relative flex items-center justify-center">
                        <img 
                            src={uitje.coverFoto} 
                            alt={uitje.titel} 
                            class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>

            <div class="flex flex-col justify-center text-center md:text-left w-full md:w-auto">
                
                <div class="mb-6">
                    <span class="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block mb-4">
                        Custom Album
                    </span>
                    
                    <h1 class="text-5xl md:text-6xl font-black text-zinc-900 tracking-tight mb-4">
                        {uitje.titel}
                    </h1>
                    
                    <p class="text-zinc-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                        Alle beelden en sterke verhalen van dit legendarische uitje.
                    </p>
                </div>

                <div class="flex flex-col gap-4 border-t border-zinc-100 pt-6">
                    
                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <span class="text-2xl">📍</span>
                        <div class="flex flex-col text-left">
                            <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Locatie</span>
                            <span class="text-lg font-black text-zinc-900 tracking-tight">{uitje.locatie}</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <span class="text-2xl">📅</span>
                        <div class="flex flex-col text-left">
                            <span class="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Datum</span>
                            <span class="text-lg font-black text-zinc-900 tracking-tight">{uitje.datum}</span>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>

        <div class="bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl p-8 md:p-10">
            <div class="flex justify-between items-center mb-8 border-b border-zinc-100 pb-6">
                <h2 class="text-3xl font-black text-zinc-900 tracking-tight">Afbeeldingen</h2>
                <span class="text-xs font-bold uppercase tracking-wider text-zinc-500 bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
                    0 Foto's
                </span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <div class="aspect-square bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all group">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
                        <span class="text-xl">📸</span>
                    </div>
                    <span class="text-[11px] font-black text-zinc-800 uppercase tracking-wider">Toevoegen</span>
                </div>
                
                <div class="aspect-square bg-zinc-50/50 rounded-2xl border border-zinc-100"></div>
                <div class="aspect-square bg-zinc-50/50 rounded-2xl border border-zinc-100"></div>
                <div class="aspect-square bg-zinc-50/50 rounded-2xl border border-zinc-100"></div>
            </div>
        </div>

    </div>
</main>