<script>
    // Dit is de centrale database van de keet. 
    // Je kunt hieronder heel makkelijk mensen toevoegen of aanpassen!
    const leden = [
        {
            naam: "Kaylan",
            rol: "Tech & Bass",
            quote: "Zonder bas is er geen gas.",
            foto: "/fotos/mensen/Kaylan.png", // Zet je eigen foto straks als 'kaylan.png' in static/fotos/
            tags: ["Bassist", "Hatseflats Beheerder"]
        },
        {
            naam: "Martijn",
            rol: "moet nog in een rol krijgen",
            quote: "moet nog een quote verzinnen",
            foto: "/fotos/mensen/Martijn.png", // Als je nog geen foto hebt, laat je dit leeg. Dan komt er een strakke placeholder!
            tags: ["Sfeermaker", "Logistiek", "Sterke Verhalen"]
        },
        {
            naam: "Daimen",
            rol: "moet nog in een rol krijgen",
            quote: "moet nog een quote verzinnen",
            foto: "/fotos/mensen/Daimen.png", // Als je nog geen foto hebt, laat je dit leeg. Dan komt er een strakke placeholder!
            tags: ["Sfeermaker", "Logistiek", "Sterke Verhalen"]
        },
        {
            naam: "Cas",
            rol: "moet nog in een rol krijgen",
            quote: "moet nog een quote verzinnen",
            foto: "/fotos/mensen/Cas.png", // Als je nog geen foto hebt, laat je dit leeg. Dan komt er een strakke placeholder!
            tags: ["Sfeermaker", "Logistiek", "Sterke Verhalen"]
        },
        {
            naam: "Hidde",
            rol: "moet nog in een rol krijgen",
            quote: "moet nog een quote verzinnen",
            foto: "/fotos/mensen/Hidde.png", // Als je nog geen foto hebt, laat je dit leeg. Dan komt er een strakke placeholder!
            tags: ["Sfeermaker", "Logistiek", "Sterke Verhalen"]
        },
        {
            naam: "Twan",
            rol: "moet nog in een rol krijgen",
            quote: "moet nog een quote verzinnen",
            foto: "/fotos/mensen/Twan.png", // Als je nog geen foto hebt, laat je dit leeg. Dan komt er een strakke placeholder!
            tags: ["Sfeermaker", "Logistiek", "Sterke Verhalen"]
        },
        {
            naam: "Leon",
            rol: "moet nog in een rol krijgen",
            quote: "moet nog een quote verzinnen",
            foto: "/fotos/mensen/Leon.png", // Als je nog geen foto hebt, laat je dit leeg. Dan komt er een strakke placeholder!
            tags: ["Sfeermaker", "Logistiek", "Sterke Verhalen"]
        }
    ];
</script>

<main class="min-h-screen bg-white text-zinc-900 pb-24 relative overflow-hidden">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
        <div class="absolute top-1/3 -right-24 w-120 h-120 bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
    </div>

    <section class="max-w-7xl mx-auto px-6 pt-16 relative z-10 w-full">
        
        <div class="text-center mb-16">
            
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900">
                <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Over ons</span>
            </h1>
            <p class="text-zinc-600 text-lg max-w-md mx-auto leading-relaxed">
                De vaste gezichten van de Hatseflats. Geautoriseerd personeel en sfeermakers op locatie.
            </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each leden as lid}
                <div class="bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-4 flex flex-col group">
                    
                    <div class="w-full aspect-4/3 bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden mb-6 relative flex items-center justify-center">
                        {#if lid.foto}
                            <img src={lid.foto} alt={lid.naam} class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                        {:else}
                            <div class="text-zinc-400 font-mono text-xs uppercase tracking-widest flex flex-col items-center gap-2">
                                <svg class="w-8 h-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                Geen foto aanwezig
                            </div>
                        {/if}
                    </div>

                    <div class="px-2 flex-1 flex flex-col">
                        <div class="flex items-baseline justify-between gap-2 mb-3">
                            <h2 class="text-2xl font-black text-zinc-900 tracking-tight">{lid.naam}</h2>
                            <span class="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                                {lid.rol}
                            </span>
                        </div>

                        <p class="text-zinc-600 italic mb-6 leading-relaxed flex-1">
                            "{lid.quote}"
                        </p>

                        <div class="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100">
                            {#each lid.tags as tag}
                                <span class="text-xs font-medium bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-lg">
                                    #{tag}
                                </span>
                            {/each}
                        </div>
                    </div>

                </div>
            {/each}
        </div>

    </section>
</main>