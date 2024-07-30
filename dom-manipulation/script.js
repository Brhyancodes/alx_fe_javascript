// Define an array of quote objects
let quotes = [];

// Simulate server interaction using JSONPlaceholder API
const apiUrl = "https://jsonplaceholder.typicode.com/quotes";

// Load quotes from local storage
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
  showRandomQuote();
}

// Function to fetch quotes from the server
function fetchQuotesFromServer() {
  fetch(apiUrl)
   .then(response => response.json())
   .then(data => {
      // Update local quotes with server data
      quotes = data;
      saveQuotes();
      showRandomQuote();
    })
   .catch(error => console.error("Error fetching quotes:", error));
}

// Function to post quotes to the server
function postQuotesToServer() {
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(quotes),
    headers: {
      "Content-Type": "application/json"
    }
  })
   .then(response => response.json())
   .then(data => console.log("Quotes posted to server successfully:", data))
   .catch(error => console.error("Error posting quotes:", error));
}

// Function to sync quotes with the server
function syncQuotes() {
  fetchQuotesFromServer();
  setTimeout(postQuotesToServer, 1000); // Post quotes to server after 1 second
}

// Set up periodic data fetching and posting
setInterval(syncQuotes, 30000); // Sync quotes every 30 seconds

// Function to resolve conflicts
function resolveConflicts(localQuotes, serverQuotes) {
  // Simple conflict resolution strategy: server's data takes precedence
  quotes = serverQuotes;
  saveQuotes();
  showRandomQuote();
  alert("Conflict resolved. Server's data has been updated.");
}

// Function to handle conflicts
function handleConflicts() {
  fetchQuotesFromServer();
  const serverQuotes = quotes;
  if (JSON.stringify(localQuotes)!== JSON.stringify(serverQuotes)) {
    resolveConflicts(localQuotes, serverQuotes);
  }
}

// Add a button to manually resolve conflicts
const conflictButton = document.createElement("button");
conflictButton.textContent = "Resolve Conflicts";
conflictButton.addEventListener("click", handleConflicts);
document.body.appendChild(conflictButton);

// Rest of the code remains the same...