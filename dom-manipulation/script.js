// Define an array of quote objects
let quotes = [];

// Load quotes from local storage
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
  showRandomQuote();
}

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
function exportQuotes() {
  const jsonQuotes = JSON.stringify(quotes);
  const blob = new Blob([jsonQuotes], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to display the last viewed quote from session storage
function displayLastViewedQuote() {
  const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");
  if (lastViewedQuote) {
    const quote = JSON.parse(lastViewedQuote);
    displayQuote(quote);
  }
}

// Function to populate categories in the select element
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = "<option value='all'>All Categories</option>";
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes by category
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;
  if (selectedCategory === "all") {
    showRandomQuote();
  } else {
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];