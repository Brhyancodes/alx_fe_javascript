// Define an array of quote objects
let quotes = [];

// Simulate server interaction using JSONPlaceholder API
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// Load quotes from local storage
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
  showRandomQuote();
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Update local quotes with server data
    quotes = data;
    saveQuotes();
    showRandomQuote();
    console.log("Quotes synced with server!");
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// Function to post quotes to the server
async function postQuotesToServer() {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(quotes),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log("Quotes posted to server successfully:", data);
  } catch (error) {
    console.error("Error posting quotes:", error);
  }
}

// Function to sync quotes with the server
async function syncQuotes() {
  await fetchQuotesFromServer();
  await postQuotesToServer();
  console.log("Quotes synced with server!");
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
async function handleConflicts() {
  const serverQuotes = await fetchQuotesFromServer();
  if (JSON.stringify(quotes)!== JSON.stringify(serverQuotes)) {
    resolveConflicts(quotes, serverQuotes);
  }
}

// Add a button to manually resolve conflicts
const conflictButton = document.createElement("button");
conflictButton.textContent = "Resolve Conflicts";
conflictButton.addEventListener("click", handleConflicts);
document.body.appendChild(conflictButton);

// Function to create the add quote form
function createAddQuoteForm() {
  const addQuoteForm = document.getElementById("addQuoteForm");
  if (!addQuoteForm) {
    const form = document.createElement("div");
    form.id = "addQuoteForm";
    const quoteTextInput = document.createElement("input");
    quoteTextInput.id = "newQuoteText";
    quoteTextInput.type = "text";
    quoteTextInput.placeholder = "Enter a new quote";
    const quoteCategoryInput = document.createElement("input");
    quoteCategoryInput.id = "newQuoteCategory";
    quoteCategoryInput.type = "text";
    quoteCategoryInput.placeholder = "Enter quote category";
    const addQuoteButton = document.createElement("button");
    addQuoteButton.id = "addQuoteBtn";
    addQuoteButton.textContent = "Add Quote";
    addQuoteButton.addEventListener("click", addQuote);
    form.appendChild(quoteTextInput);
    form.appendChild(quoteCategoryInput);
    form.appendChild(addQuoteButton);
    document.body.appendChild(form);
  }
}

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    displayQuote(randomQuote);
    // Save the last viewed quote to session storage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
  }
}

// Function to display a quote
function displayQuote(quote) {
  const quoteElement = document.createElement("p");
  quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear the previous quote
  quoteDisplay.appendChild(quoteElement);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    displayQuote(newQuote);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    saveQuotes();
    populateCategories();
  } else {
    alert("Please fill in both quote text and category.");
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to export quotes to JSON file