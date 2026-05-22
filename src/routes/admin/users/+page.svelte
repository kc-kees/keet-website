<script>
    import { enhance } from '$app/forms';
    let { data } = $props();
</script>

<div class="max-w-2xl mx-auto p-8">
    <h1 class="text-2xl font-black mb-6">User Management</h1>

    <form method="POST" action="?/add" use:enhance class="bg-white p-6 rounded-2xl border shadow-sm mb-8 flex gap-4">
        <input type="email" name="email" placeholder="Email adres" required class="border p-2 rounded w-full" />
        <select name="rol" class="border p-2 rounded">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit" class="bg-black text-white px-4 py-2 rounded">Toevoegen</button>
    </form>

    <div class="space-y-4">
        {#each data.users as user}
            <div class="flex justify-between items-center bg-white p-4 rounded-xl border">
                <div>
                    <p class="font-bold">{user.email}</p>
                    <span class="text-xs bg-zinc-100 px-2 py-1 rounded">{user.rol}</span>
                </div>
                <form method="POST" action="?/delete" use:enhance>
                    <input type="hidden" name="id" value={user.id} />
                    <button type="submit" class="text-red-500 hover:text-red-700">Verwijderen</button>
                </form>
            </div>
        {/each}
    </div>
</div>