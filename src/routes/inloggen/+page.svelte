<main class="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
    <div class="bg-white border border-zinc-100 rounded-4xl shadow-xl p-8 w-full max-w-sm text-center">
        <h1 class="text-3xl font-black uppercase tracking-tighter mb-6">Keet Login</h1>
        
        <form method="POST" action="?/login" class="space-y-4">
            <input 
                type="email" 
                name="email" 
                placeholder="jouw@email.nl" 
                required 
                class="w-full p-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button 
                type="submit" 
                class="w-full bg-zinc-950 text-white font-black uppercase py-4 rounded-xl hover:bg-orange-500 transition-colors"
            >
                Inloggen
            </button>
        </form>
    </div>
</main>