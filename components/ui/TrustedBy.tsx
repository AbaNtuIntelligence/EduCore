export default function TrustedBy() {
  const clients = [
    'Schools',
    'Clinics',
    'Municipalities',
    'Government',
    'Corporates',
    'NGOs'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 text-sm uppercase tracking-wider mb-8">
          Trusted by organisations across South Africa
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {clients.map((client) => (
            <span
              key={client}
              className="text-lg font-medium text-[#1A2B4C]/60 hover:text-[#1A2B4C] transition"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
