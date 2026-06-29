import { School, Stethoscope, Landmark, Building, Users2, Heart } from 'lucide-react';
import Container from './Container';
import SectionTitle from './SectionTitle';

const clients = [
  { name: 'Schools', icon: School },
  { name: 'Clinics', icon: Stethoscope },
  { name: 'Municipalities', icon: Landmark },
  { name: 'Government', icon: Building },
  { name: 'Corporates', icon: Users2 },
  { name: 'NGOs', icon: Heart },
];

export default function TrustedBy() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle 
          title="Trusted by Organisations" 
          subtitle="Across South Africa"
        />
        
        <div className="mt-12 flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {clients.map((client) => {
            const Icon = client.icon;
            return (
              <div key={client.name} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#F05A28]/10 transition-colors">
                  <Icon className="w-8 h-8 text-gray-400 group-hover:text-[#F05A28] transition-colors" />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-[#1A2B4C] transition-colors">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
