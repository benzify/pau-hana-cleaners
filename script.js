document.querySelectorAll('.navbar-collapse a').forEach(link => link.addEventListener('click', () => {
  const menu = document.querySelector('.navbar-collapse');
  if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));

// Use Bootstrap's API so hover and click share the same accessible state.
const desktopHover = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
  let closeTimer;
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(closeTimer);
    if (desktopHover.matches) bootstrap.Dropdown.getOrCreateInstance(toggle).show();
  });
  dropdown.addEventListener('mouseleave', () => {
    if (!desktopHover.matches) return;
    // Allow the pointer to cross the small gap below the toggle.
    closeTimer = setTimeout(() => bootstrap.Dropdown.getOrCreateInstance(toggle).hide(), 150);
  });
});

// Service pages retain their page-level navigation state while scrolling.
if (!document.body.classList.contains('standard-cleaning-page')) {
  const sections = [...document.querySelectorAll('header[id], main section[id]')];
  const navLinks = [...document.querySelectorAll('.navbar-nav .nav-link')];
  const updateActiveNavigation = () => {
    const current = sections.filter(section => section.offsetTop <= window.scrollY + 180).at(-1)?.id;
    navLinks.forEach(link => {
      const target = link.id === 'servicesDropdown' ? '#services' : link.getAttribute('href');
      link.classList.toggle('active', target === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateActiveNavigation, { passive: true });
  updateActiveNavigation();
}
