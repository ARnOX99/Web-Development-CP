function showSeason(season) {
  // Hide all season content
  document.querySelectorAll('.season-content').forEach(el => {
    el.classList.remove('active');
  });

  // Remove active from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected season
  document.getElementById(season).classList.add('active');

  // Highlight clicked tab
  event.target.classList.add('active');
}
