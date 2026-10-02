document.addEventListener('DOMContentLoaded', () => {

  const loader = document.getElementById('loader');

  const navigationType = performance.getEntriesByType('navigation')[0]?.type;
  const isRefresh = navigationType === 'reload';
  const navbarName = document.getElementById('navbarName');

  navbarName.addEventListener('click', () => {
    sessionStorage.setItem('skipLoader', 'true');
  });

  if (isRefresh || sessionStorage.getItem('skipLoader') === 'true') {

    loader.style.display = 'none';
    document.body.style.opacity = 1;
    document.body.classList.add('loaded');

  } else {

    loader.style.display = 'flex';

    setTimeout(() => {

      loader.style.opacity = 0;
      loader.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {

        loader.style.display = 'none';
        document.body.style.opacity = 1;
        document.body.classList.add('loaded');

      }, 500);

    }, 500);

  }

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

// ---------- THEME TOGGLE ----------

const sunBtn = document.getElementById("sunBtn");
const moonBtn = document.getElementById("moonBtn");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}

// Light mode
sunBtn.addEventListener("click", () => {
  document.body.classList.add("light-mode");
  localStorage.setItem("theme", "light");
});

// Dark mode
moonBtn.addEventListener("click", () => {
  document.body.classList.remove("light-mode");
  localStorage.setItem("theme", "dark");
});

const copyBtn = document.querySelector(".copy-btn");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);

    copyBtn.innerHTML = '<i class="fas fa-check"></i>';

    const copiedMessage = document.createElement("div");
    copiedMessage.textContent = "Link copied!";
    copiedMessage.classList.add("copy-message");

    document.body.appendChild(copiedMessage);

    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fas fa-link"></i>';
      copiedMessage.remove();
    }, 1500);

  } catch (error) {
    console.error("Failed to copy URL:", error);
  }
});

const arrowBtn = document.querySelector(".arrow-btn");
const verticalDiv = document.querySelector(".vertical-div");

arrowBtn.addEventListener("click", () => {
  verticalDiv.classList.toggle("collapsed");

  if (verticalDiv.classList.contains("collapsed")) {
    arrowBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  } else {
    arrowBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  }
});