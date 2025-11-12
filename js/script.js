document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  const folderIcon = document.getElementById('folderIcon');

  folderIcon.addEventListener('click', () => {
    folderIcon.classList.toggle('active');
  });

  folderIcon.addEventListener('touchstart', () => {
    folderIcon.classList.add('hover-mobile');
  });

  folderIcon.addEventListener('touchend', () => {
    folderIcon.classList.remove('hover-mobile');
  });
});