<script>
    import { enhance } from '$app/forms';
    let { form } = $props();
</script>

<div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white border-4 border-zinc-950 rounded-3xl p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center uppercase font-black tracking-widest">
        
        {#if form?.success}
            <h1 class="text-2xl text-orange-500 mb-4">Mail is verstuurd! ✉️</h1>
            <p class="text-xs text-zinc-600 mb-6 normal-case font-medium tracking-normal">
                Check je mailbox voor de inloglink. 
                <br><br>
                <strong>Je mag dit tabblad nu sluiten.</strong>
            </p>
        {:else}
            <h1 class="text-2xl text-orange-500 mb-4">Inloggen</h1>
            <p class="text-xs text-zinc-600 mb-6 normal-case font-medium tracking-normal">Vul je e-mail in om een inloglink te ontvangen.</p>
            
            {#if form?.message}
                <p class="text-red-600 text-xs mb-4 p-2 border-2 border-red-600 bg-red-50 rounded-lg normal-case font-bold tracking-normal">{form.message}</p>
            {/if}

            <form method="POST" action="?/login" use:enhance class="flex flex-col gap-4">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="jouw@email.nl" 
                    required 
                    class="p-3 border-2 border-zinc-950 rounded-xl focus:outline-none focus:border-orange-500 text-sm normal-case"
                />
                <button type="submit" class="bg-zinc-950 text-white p-3 border-2 border-zinc-950 rounded-xl hover:bg-orange-500 hover:text-zinc-950 transition-all text-sm">
                    Stuur Inloglink
                </button>
            </form>
        {/if}

    </div>
</div>