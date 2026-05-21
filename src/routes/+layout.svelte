<script>
    import '../app.css'; // DIT is de magische regel die Tailwind aanzet!
    let { children } = $props();
</script>

<nav class="bg-white text-zinc-950 p-6 flex justify-center gap-12 border-b-4 border-zinc-950 uppercase font-black tracking-widest">
    <a href="/" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Home</a>
    <a href="/over-ons" class="hover:text-amber-500 hover:-translate-y-1 transition-all">Smoelenboek</a>
</nav>

{@render children()}