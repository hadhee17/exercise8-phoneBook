"use strict";

const contactContainer = document.querySelector(".contact-list");
const btnContact = document.querySelector(".view-all-contacts");
const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".search-button");
const searchResult = document.querySelector(".search-result");
const inputName = document.querySelector(".name");
const inputPhoneNumber = document.querySelector(".phone");
const inputAddress = document.querySelector(".address");

let APIdata = []; // Store fetched data in APIdata

///API Function to Fetch Contacts
const API = async function () {
  try {
    const response = await fetch(
      "https://684af8d5165d05c5d35b083b.mockapi.io/v1/users"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    APIdata = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
API();

// View All Contacts
btnContact.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    contactContainer.innerHTML = ""; // Clear previous content

    APIdata.map((item) => {
      const html = `
        <div class="contact-item">
          <li>
            <strong>Name:</strong> ${item.name}<br />
            <strong>Phone:</strong> ${item.phoneNumber}<br />
            <strong>Address:</strong> ${item.address}<br />
          </li>
          <div>
            <button class="btn" id="edit">Edit</button>
            <button class="btn" id="delete">Delete</button>
          </div>
        </div>
    `;
      contactContainer.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("error fetching contact:", error);
  }
});

// Search Contacts
searchButton.addEventListener("click", function () {
  const searchText = searchInput.value.trim().toLowerCase();
  if (!searchText) {
    searchResult.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }
  const filteredContacts = APIdata.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchText) ||
      contact.phoneNumber.includes(searchText)
    );
  });

  searchResult.innerHTML = "";
  filteredContacts.forEach((item) => {
    const html = `
        <li>
          <strong>Name:</strong> ${item.name}<br />
          <strong>Phone:</strong> ${item.phoneNumber}<br />
          <strong>Address:</strong> ${item.address}<br />
        </li>
        
      `;
    searchResult.insertAdjacentHTML("beforeend", html);
  });
});

//delete contact
document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "delete") {
    const contactItem = event.target
      .closest(".contact-list")
      .querySelector(".contact-item");
    contactItem.remove();
    // Find the contact details to remove from APIdata
    const name = contactItem
      .querySelector("strong")
      .nextSibling.textContent.trim();
    const phone = contactItem
      .querySelectorAll("strong")[1]
      .nextSibling.textContent.trim();
    const address = contactItem
      .querySelectorAll("strong")[2]
      .nextSibling.textContent.trim();

    // Find index in APIdata
    const index = APIdata.findIndex(
      (contact) =>
        contact.name === name &&
        contact.phoneNumber === phone &&
        contact.address === address
    );
    if (index !== -1) {
      APIdata.splice(index, 1);
    }

    console.log(APIdata);
  }
});

//add contact

document.querySelector("#add-contact").addEventListener("click", (e) => {
  e.preventDefault();
  const name = inputName.value.trim();
  const phoneNumber = inputPhoneNumber.value.trim();
  const address = inputAddress.value.trim();

  if (!name || !phoneNumber || !address) {
    alert("Please fill in all fields.");
    return;
  }

  // Create a new contact object
  const newContact = {
    name,
    phoneNumber,
    address,
  };

  // Add to local array
  APIdata.push(newContact);
  console.log(APIdata);

  // Clear input fields
  inputName.value = "";
  inputPhoneNumber.value = "";
  inputAddress.value = "";
});

// Edit contact
document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "edit") {
    const contactItem = event.target
      .closest(".contact-item")
      .querySelector("li");
    const name = contactItem
      .querySelector("strong")
      .nextSibling.textContent.trim();
    const phone = contactItem
      .querySelectorAll("strong")[1]
      .nextSibling.textContent.trim();
    const address = contactItem
      .querySelectorAll("strong")[2]
      .nextSibling.textContent.trim();

    // Populate input fields with existing data
    inputName.value = name;
    inputPhoneNumber.value = phone;
    inputAddress.value = address;

    // Remove the contact item from the display
    contactItem.parentElement.remove();
  }
});
