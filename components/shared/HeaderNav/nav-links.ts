const NavLinks = [
  { label: 'Projects', href: '#', desktop: false, mobile: true },
  { label: 'Who We Are', href: '#', desktop: true, mobile: true },
  { label: 'Recognition', href: '#', desktop: true, mobile: true },
  { label: 'Contact Us', href: '#', desktop: true, mobile: true },
]

export const DesktopNavLinks = NavLinks.filter(({ desktop }) => desktop)
export const MobileNavLinks = NavLinks.filter(({ mobile }) => mobile)
