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
    
    <div class="hidden md:flex justify-center items-center gap-8 lg:gap-12 p-6 text-sm lg:text-base">
        <a href="/" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Home</a>
        <a href="/over-ons" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Over ons</a>
        <a href="/over-de-keet" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Over de keet</a>
        <a href="/keet-regels" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Keet regels</a>
        <a href="/uitjes" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Uitjes</a>
        <a href="/bussen" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Bussen</a>
        <a href="/keet-muziek" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Keet Muziek</a>

        {#if data.user}
            <div class="dropdown-container relative">
                <button 
                    onclick={() => dropdownOpen = !dropdownOpen}
                    class="hover:text-orange-500 hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                    👤 {data.user.email.split('@')[0]} ▼
                </button>

                {#if dropdownOpen}
                    <div class="absolute right-0 top-full mt-4 w-48 bg-white border-4 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-2 z-50 text-sm">
                        <div class="px-4 py-2 text-[10px] text-zinc-400 border-b-2 border-zinc-100">{data.user.email}</div>
                        {#if data.user.rol === 'ADMIN'}
                            <a href="/admin/users" class="block px-4 py-2 hover:bg-orange-100 hover:text-orange-600 transition-colors">Beheer</a>
                        {/if}
                        <a href="/uitloggen" class="block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">Uitloggen</a>
                    </div>
                {/if}
            </div>
        {:else}
            <a href="/inloggen" class="hover:text-orange-500 hover:-translate-y-1 transition-all">Inloggen</a>
        {/if}
    </div>

    <div class="md:hidden flex justify-between items-center p-4">
        <span class="text-xl text-orange-500 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">MENU</span>
        <button onclick={() => menuOpen = !menuOpen} class="p-2 active:scale-95 transition-transform text-zinc-950">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                {#if menuOpen}
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                {/if}
            </svg>
        </button>
    </div>

    {#if menuOpen}
        <div class="md:hidden flex flex-col items-center gap-5 py-8 px-4 bg-white border-b-4 border-zinc-950 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] absolute w-full left-0 z-50 text-lg">
            
            <a href="/" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Home</a>
            <a href="/over-ons" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Over ons</a>
            <a href="/over-de-keet" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Over de keet</a>
            <a href="/keet-regels" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Keet regels</a>
            <a href="/uitjes" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Uitjes</a>
            <a href="/bussen" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Bussen</a>
            <a href="/keet-muziek" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Keet Muziek</a>

            <div class="w-12 h-1 bg-zinc-950 my-2 rounded-full"></div>

            {#if data.user}
                {#if data.user.rol === 'ADMIN'}
                    <a href="/admin/users" onclick={() => menuOpen = false} class="text-orange-500 hover:text-orange-600 transition-colors w-full text-center flex items-center justify-center gap-2">
                        <span>Beheer</span> <span class="text-xs bg-orange-500 text-white px-2 py-1 rounded-md">ADMIN</span>
                    </a>
                {/if}
                <a href="/uitloggen" onclick={() => menuOpen = false} class="text-red-600 hover:text-red-700 transition-colors w-full text-center">
                    Uitloggen <span class="text-xs text-zinc-400 block mt-1 normal-case tracking-normal">({data.user.email.split('@')[0]})</span>
                </a>
            {:else}
                <a href="/inloggen" onclick={() => menuOpen = false} class="hover:text-orange-500 transition-colors w-full text-center">Inloggen</a>
            {/if}
            
        </div>
    {/if}
</nav>

{@render children()}