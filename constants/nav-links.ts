const NavLinks = [
  { label: 'Projects', href: '/?mode=list', desktopHeader: false, mobileHeader: true, desktopFooter: false, mobileFooter: true },
  { label: 'Who We Are', href: '/who-we-are', desktopHeader: true, mobileHeader: true, desktopFooter: true, mobileFooter: true },
  { label: 'Recognition', href: '/recognition', desktopHeader: true, mobileHeader: true, desktopFooter: true, mobileFooter: true },
  { label: 'Contact Us', href: '/contact-us', desktopHeader: true, mobileHeader: true, desktopFooter: true, mobileFooter: true },
]

export const DesktopHeaderNavLinks = NavLinks.filter(({ desktopHeader }) => desktopHeader)
export const MobileHeaderNavLinks = NavLinks.filter(({ mobileHeader }) => mobileHeader)
export const FooterNavLinks = NavLinks.filter(({ desktopFooter, mobileFooter }) => desktopFooter || mobileFooter)
