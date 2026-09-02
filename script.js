document.querySelectorAll('.navbar-collapse a').forEach(link => link.addEventListener('click', () => {
  const menu = document.querySelector('.navbar-collapse');
  if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));

const sections = [...document.querySelectorAll('header[id], main section[id]')];
const navLinks = [...document.querySelectorAll('.navbar-nav .nav-link')];
window.addEventListener('scroll', () => {
  const current = sections.filter(section => section.offsetTop <= scrollY + 180).at(-1)?.id;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, { passive: true });
