// Define an array of quote objects
let quotes = [
    {
      text: "An investment in knowledge pays the best interest.",
      category: "Wisdom"
    },
    {
      text: "When you fall down pick your feet, stand up again and try again.",
      category: "Resilience"
    },
    {
      text: "Excellence glorifies God and Aspires Men!",
      category: "Motivation"
    }
  ];
  
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
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    displayQuote(randomQuote);
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
    } else {
      alert("Please fill in both quote text and category.");
    }
  }
  
  // Call the createAddQuoteForm function
  createAddQuoteForm();
  
  // Add event listeners to the buttons
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);