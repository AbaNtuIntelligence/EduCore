"use client";

interface SocialLink {
  name: string;
  label: string;
  href: string;
  display: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    label: 'Follow us on Facebook',
    href: 'https://facebook.com/educore',
    display: 'f'
  },
  {
    name: 'LinkedIn',
    label: 'Connect with us on LinkedIn',
    href: 'https://linkedin.com/company/educore',
    display: 'in'
  },
  {
    name: 'Instagram',
    label: 'Follow us on Instagram',
    href: 'https://instagram.com/educore',
    display: 'ig'
  },
  {
    name: 'YouTube',
    label: 'Subscribe to our YouTube channel',
    href: 'https://youtube.com/educore',
    display: 'yt'
  },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="text-gray-400 hover:text-[#F05A28] transition-colors duration-200 font-bold text-sm"
        >
          {social.display}
        </a>
      ))}
    </div>
  );
}
