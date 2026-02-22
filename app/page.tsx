export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigace */}
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <div className="font-bold text-xl">Investuj bez starosti</div>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#">Jak to funguje</a>
          <a href="#">Projekty</a>
          <a href="#">O nás</a>
          <a href="#">Konzultace</a>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          Začít investovat
        </button>
      </nav>

      {/* Hero sekce */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold max-w-2xl leading-tight">
          Vlastněte byt, my zajistíme zbytek
        </h1>
        <p className="mt-6 text-xl text-gray-500 max-w-xl">
          Investujte do nemovitostí bez starostí se správou. My se postaráme o vše za vás.
        </p>
        <button className="mt-8 bg-black text-white px-8 py-4 rounded-lg text-lg">
          Zjistit více
        </button>
      </section>
    </main>
  )
}