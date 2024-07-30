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
  
  // Call the createAddQuoteForm function
  createAddQuoteForm();