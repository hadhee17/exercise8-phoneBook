"use strict";

const contactContainer = document.querySelector(".contact-list");
const btnContact = document.querySelector(".view-all-contacts");
const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".search-button");
const searchResult = document.querySelector(".search-result");

let APIdata = [];

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
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// View All Contacts
btnContact.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const data = await API();
    APIdata = data; // Store fetched data in APIdata
    contactContainer.innerHTML = ""; // Clear previous content

    APIdata.map((item) => {
      const html = `
       
        <li>
          <strong>Name:</strong> ${item.name}<br />
          <strong>Phone:</strong> ${item.phoneNumber}<br />
          <strong>Address:</strong> ${item.address}<br />
        </li>
        
    `;
      contactContainer.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("error fetching contact:", error);
  }
});

// Search Contacts
searchButton.addEventListener("click", async () => {
  const searchText = searchInput.value.toLowerCase();
  try {
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
  } catch (error) {
    console.error("error searching contacts:", error);
  }

  console.log(searchText);
});
