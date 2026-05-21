<main class="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
    <div class="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 border border-zinc-200">
        <h1 class="text-2xl font-black text-zinc-900 mb-8">Nieuw Uitje</h1>

        <form method="POST" enctype="multipart/form-data" class="space-y-5">
            
            <div class="space-y-1">
                <label for="titel" class="text-xs font-bold uppercase tracking-wider text-zinc-500">Titel</label>
                <input id="titel" type="text" name="titel" required class="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3">
            </div>

            <div class="space-y-1">
                <label for="locatie" class="text-xs font-bold uppercase tracking-wider text-zinc-500">Locatie</label>
                <input id="locatie" type="text" name="locatie" required class="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3">
            </div>

            <div class="space-y-1">
                <label for="datum" class="text-xs font-bold uppercase tracking-wider text-zinc-500">Datum</label>
                <input id="datum" type="text" name="datum" required class="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3">
            </div>

            <div class="space-y-1">
                <label for="afbeelding" class="text-xs font-bold uppercase tracking-wider text-zinc-500">Cover Foto</label>
                <input id="afbeelding" type="file" name="afbeelding" accept="image/*" class="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3" required>
            </div>

            <button type="submit" class="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl hover:bg-black mt-4">
                Opslaan met Foto
            </button>
        </form>
    </div>
</main>