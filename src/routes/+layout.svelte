<script>
    import '../app.css'; // DIT is de magische regel die Tailwind aanzet!
    let { children } = $props();

    // Svelte 5 state om bij te houden of het mobiele menu open of dicht is
    let menuOpen = $state(false);
</script>

<nav class="bg-white text-zinc-950 relative z-50 border-b-4 border-zinc-950 uppercase font-black tracking-widest">
    
    <div class="hidden md:flex justify-center gap-12 p-6">
        <a href="/" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Home</a>
        <a href="/over-ons" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Over ons</a>
        <a href="/over-de-keet" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Over de keet</a>
        <a href="/keet-regels" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Keet regels</a>
        <a href="/uitjes" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Uitjes</a>
        <a href="/inloggen" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Inloggen</a>
    </div>

    <div class="md:hidden flex justify-between items-center p-4">
        <span class="text-lg text-orange-500">Menu</span>
        <button 
            onclick={() => menuOpen = !menuOpen} 
            class="p-2 focus:outline-none hover:text-amber-500 transition-colors"
            aria-label="Toggle navigatie menu"
        >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {#if menuOpen}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                {/if}
            </svg>
        </button>
    </div>

    {#if menuOpen}
        <div class="md:hidden flex flex-col items-center gap-6 py-6 px-4 bg-white border-t-2 border-zinc-100 shadow-xl absolute w-full left-0">
            <a href="/" onclick={() => menuOpen = false} class="hover:text-amber-500 transition-colors">Home</a>
            <a href="/over-ons" onclick={() => menuOpen = false} class="hover:text-amber-500 transition-colors">Over ons</a>
            <a href="/over-de-keet" onclick={() => menuOpen = false} class="hover:text-amber-500 transition-colors">Over de keet</a>
            <a href="/keet-regels" onclick={() => menuOpen = false} class="hover:text-amber-500 transition-colors">Keet regels</a>
            <a href="/uitjes" onclick={() => menuOpen = false} class="hover:text-amber-500 transition-colors">Uitjes</a>
            <a href="/inloggen" onclick={() => menuOpen = false} class="hover:text-amber-500 transition-colors">Inloggen</a>
        </div>
    {/if}
</nav>

{@render children()}