document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');

  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      loader.style.display = 'none';
      document.body.style.opacity = 1;
      document.body.classList.add('loaded');
    }, 500);
  }, 500);

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

// Last GitHub commit date and time
async function updateLastCommit() {

    try {

        const response = await fetch(
            "https://api.github.com/repos/garvitnegi17/garvitnegi/commits?per_page=1"
        );

        const commits = await response.json();

        const commitDate = new Date(commits[0].commit.author.date);

        const formattedDate = commitDate.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata"
        });

        document.getElementById("lastUpdated").innerHTML =
            formattedDate.replace("am", "AM").replace("pm", "PM") + "&nbsp;IST";

    } catch (error) {

        console.error("Could not fetch latest GitHub commit:", error);

        document.getElementById("lastUpdated").textContent =
            "Unavailable";
    }
}

updateLastCommit();