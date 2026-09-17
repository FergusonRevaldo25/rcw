const clients = [
  { name: "Corner Coffee Co.", quote: "Bookings doubled in the first month." },
  { name: "Atlas Auto Repair", quote: "Customers finally find us before calling." },
  { name: "Bloom & Co Florist", quote: "Online orders pay for the site every week." },
];

export default function ClientLogos() {
  return (
    <section className="container-page py-20 border-t border-black/10">
      <h2 className="text-3xl font-bold mb-12">Businesses we've built for</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div key={client.name}>
            <p className="font-semibold mb-2">{client.name}</p>
            <p className="text-sm text-[var(--color-muted)]">"{client.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
