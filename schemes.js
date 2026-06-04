function filterSchemes() {
  const input = document.getElementById('schemeSearch').value.toLowerCase();
  const cards = document.querySelectorAll('.scheme-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.getAttribute('data-name');
    if (name.includes(input)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  document.getElementById('noResults').style.display =
    visibleCount === 0 ? 'block' : 'none';
}