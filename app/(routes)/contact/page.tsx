export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1A2B4C] mb-8">
        Contact Us
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-[#1A2B4C] mb-4">Get In Touch</h3>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Address:</strong><br />
              104 Donnelly Street<br />
              Turffontein<br />
              Johannesburg, 2190
            </p>
            <p>
              <strong>Phone:</strong><br />
              071 945 0220
            </p>
            <p>
              <strong>Email:</strong><br />
              info@educore.co.za
            </p>
            <p>
              <strong>Managing Director:</strong><br />
              Bongani Dube
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#1A2B4C] mb-4">Send Us a Message</h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F05A28] focus:outline-none" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F05A28] focus:outline-none" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#F05A28] focus:outline-none"></textarea>
            </div>
            <button className="w-full rounded-lg bg-[#F05A28] px-6 py-3 text-white font-semibold hover:bg-[#d94a1e] transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
