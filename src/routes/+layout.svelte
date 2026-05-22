<script>
    import '../app.css';
    let { data, children } = $props();

    let menuOpen = $state(false);
    let dropdownOpen = $state(false);

    // Sluit dropdown als je ergens anders op de pagina klikt
    function closeDropdown(e) {
        if (!e.target.closest('.dropdown-container')) dropdownOpen = false;
    }
</script>

<svelte:window onclick={closeDropdown} />

<nav class="bg-white text-zinc-950 relative z-50 border-b-4 border-zinc-950 uppercase font-black tracking-widest">
    
    <div class="hidden md:flex justify-center items-center gap-12 p-6">
        <a href="/" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Home</a>
        <a href="/over-ons" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Over ons</a>
        <a href="/over-de-keet" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Over de keet</a>
        <a href="/keet-regels" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Keet regels</a>
        <a href="/uitjes" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Uitjes</a>
        <a href="/bussen" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Bussen</a>


        {#if data.user}
            <div class="dropdown-container relative">
                <button 
                    onclick={() => dropdownOpen = !dropdownOpen}
                    class="hover:text-amber-500 hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                    👤 {data.user.email.split('@')[0]} ▼
                </button>

                {#if dropdownOpen}
                    <div class="absolute right-0 top-full mt-4 w-48 bg-white border-2 border-zinc-950 shadow-xl py-2 z-50 text-sm">
                        <div class="px-4 py-2 text-[10px] text-zinc-400 border-b border-zinc-100">{data.user.email}</div>
                        {#if data.user.rol === 'ADMIN'}
                            <a href="/admin/users" class="block px-4 py-2 hover:bg-zinc-100">Beheer</a>
                        {/if}
                        <a href="/uitloggen" class="block px-4 py-2 text-red-600 hover:bg-red-50">Uitloggen</a>
                    </div>
                {/if}
            </div>
        {:else}
            <a href="/inloggen" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Inloggen</a>
        {/if}
    </div>

    <div class="md:hidden flex justify-between items-center p-4">
        <span class="text-lg text-orange-500">Menu</span>
        <button onclick={() => menuOpen = !menuOpen} class="p-2">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {#if menuOpen}<path d="M6 18L18 6M6 6l12 12" />{:else}<path d="M4 6h16M4 12h16M4 18h16" />{/if}
            </svg>
        </button>
    </div>

    {#if menuOpen}
        <div class="md:hidden flex flex-col items-center gap-6 py-6 px-4 bg-white border-t-2 border-zinc-100 shadow-xl absolute w-full left-0 z-50">
            <a href="/" onclick={() => menuOpen = false}>Home</a>
            <a href="/uitjes" onclick={() => menuOpen = false}>Uitjes</a>
            {#if data.user}
                {#if data.user.rol === 'ADMIN'}
                    <a href="/admin/users" onclick={() => menuOpen = false} class="text-orange-600">Beheer</a>
                {/if}
                <a href="/uitloggen" onclick={() => menuOpen = false} class="text-red-600">Uitloggen ({data.user.email.split('@')[0]})</a>
            {:else}
                <a href="/inloggen" onclick={() => menuOpen = false}>Inloggen</a>
            {/if}
            <a href="/bussen" onclick={() => menuOpen = false}>Bussen</a>
        </div>
    {/if}
</nav>

{@render children()}