const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://57.128.243.135:8055";

async function getHotelInfo() {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/hotel_info`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getBlogPosts() {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/blog_posts?sort=-date_created&limit=10`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const hotelInfo = await getHotelInfo();
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-amber-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            {hotelInfo?.name || "Hotel da Cani"}
          </h1>
          <p className="text-xl mt-3 text-amber-200">
            {hotelInfo?.tagline ||
              "Il miglior soggiorno per il tuo amico a 4 zampe"}
          </p>
        </div>
      </header>

      {/* Servizi */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-10">
          I Nostri Servizi
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Pensione",
              desc: "Camere confortevoli con area gioco dedicata",
              icon: "🏠",
            },
            {
              title: "Toelettatura",
              desc: "Bagno, taglio e trattamenti spa",
              icon: "✂️",
            },
            {
              title: "Addestramento",
              desc: "Corsi individuali e di gruppo",
              icon: "🎓",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-8 text-center shadow-md"
            >
              <span className="text-5xl">{s.icon}</span>
              <h3 className="text-xl font-semibold text-amber-900 mt-4">
                {s.title}
              </h3>
              <p className="text-gray-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-10">
            Dal Nostro Blog
          </h2>
          {posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post: { id: string; title: string; content: string; date_created: string }) => (
                <article
                  key={post.id}
                  className="border-l-4 border-amber-500 pl-6 py-2"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {post.content}
                  </p>
                  <span className="text-sm text-gray-400">
                    {new Date(post.date_created).toLocaleDateString("it-IT")}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Nessun articolo ancora. I contenuti verranno gestiti da Directus!
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-200 py-8 text-center">
        <p>Hotel da Cani &copy; {new Date().getFullYear()}</p>
        <p className="text-sm mt-1">
          Powered by Next.js + Directus | Deployed with Coolify
        </p>
      </footer>
    </div>
  );
}
