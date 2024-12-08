document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.getElementById("tabs");
    const contentContainer = document.getElementById("content");
  
    // Handle tab switching
    tabsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("tab")) {
        // Update active tab styling
        document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
        event.target.classList.add("active");
  
        // Load content for the selected tab
        const tabName = event.target.getAttribute("data-tab");
        loadTabContent(tabName);
      }
    });
  
    // Function to load content for a specific tab
    function loadTabContent(tabName) {
      contentContainer.innerHTML = ""; // Clear current content
      switch (tabName) {
        case "home":
          loadHomeTab(contentContainer);
          break;
        case "about":
          loadAboutTab(contentContainer);
          break;
        case "services":
          loadServicesTab(contentContainer);
          break;
        case "portfolio":
          loadPortfolioTab(contentContainer);
          break;
        case "contact":
          loadContactTab(contentContainer);
          break;
        default:
          contentContainer.innerHTML = "<p>Content not found.</p>";
      }
    }
  
    // Initialize Home tab by default
    loadTabContent("home");
  });
  