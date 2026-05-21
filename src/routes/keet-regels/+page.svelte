<script>
    // Jouw centrale wetboek database. 
    // Voeg hier gewoon een nieuw blokje toe en de website bouwt hem automatisch op!
    const regels = [
        {
            titel: "Bussen",
            tekst: "Elke zaterdag avond wordt er minimaal 1 keer gebust, en degene in de bus wordt dan vermeld op het Hatseflats instagram verhaal."
        },
        {
            titel: "Altijd drinken",
            tekst: "Als je een biertje gaat halen vraag je altijd of er nog meer iets willen. dit om te voorkomen dat mensen niet meer gaan drinken."
        },
        {
            titel: "Afsluiten",
            tekst: "De laatste personen die de keet verlaten, sluiten altijd de keet af door de stroom uit te zetten."
        },
        {
            titel: "Openen",
            tekst: "De eerste persoon die de keet binnenkomt, doet als eerste de lege flessen die er nog staan in lege kratten stoppen."
        },
        {
            titel: "krattenkamer",
            tekst: "alle kratten die we gevuld hebben met lege flesjes worden neergezet in de krattenkamer. de bedoeling van deze kamer is dat je er niet meer  in kan omdat er teveel kratten in staan."
        }
        
    ];
</script>

<main class="min-h-screen bg-white text-zinc-900 pb-24 relative overflow-hidden">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
        <div class="absolute top-1/3 -right-24 w-120 h-120 bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        <div class="absolute bottom-1/4 -left-24 w-md h-112 bg-orange-100 rounded-full mix-blend-multiply filter blur-[90px] opacity-30"></div>
    </div>

    <section class="max-w-4xl mx-auto px-6 pt-16 relative z-10 w-full">
        
        <div class="mb-16 border-b border-zinc-100 pb-8">
            
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900">
                Het <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Wetboek</span>
            </h1>
            <p class="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                Bindende voorwaarden voor toegang tot de Keet
            </p>
        </div>

        <div class="space-y-6">
            
            {#each regels as regel, index}
                <div class="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow">
                    
                    <div class="bg-white border border-zinc-200 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                        <span class="font-black text-xl text-orange-600">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    
                    <div>
                        <h2 class="text-2xl font-black text-zinc-900 mb-2 tracking-tight">{regel.titel}</h2>
                        <p class="text-zinc-600 text-lg leading-relaxed">
                            {regel.tekst}
                        </p>
                    </div>

                </div>
            {/each}

        </div>

    </section>
</main>