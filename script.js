const button = document.getElementById("search-button");
const input = document.getElementById("city-input");
const cityNameElement = document.getElementById("city-name");
const cityTimeElement = document.getElementById("city-time");
const cityTempElement = document.getElementById("city-temp");
const loadingElement = document.createElement("p"); // Create loading element
loadingElement.innerText = "Loading..."; // Default loading message
loadingElement.classList.add("loading"); // Apply loading style

async function getData(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=411ebe62e6c24398b6a150347242810&q=${city}&aqi=yes`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        return await response.json();
    } catch (error) {
        return { error: error.message }; // Return error message as part of an object
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim(); // Remove whitespace
    
    if (!value) {
        alert("Please enter a city name."); // Alert for empty input
        return;
    }

    cityNameElement.innerText = '';
    cityTimeElement.innerText = '';
    cityTempElement.innerText = '';
    
    // Display loading indicator in the result container
    const resultContainer = document.querySelector(".result-container");
    resultContainer.appendChild(loadingElement);

    const result = await getData(value);
    loadingElement.remove(); // Remove loading indicator

    if (result && !result.error) {
        cityNameElement.innerText = `Location = ${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTimeElement.innerText = `Date and Time = ${result.location.localtime}`;
        cityTempElement.innerText = `Temperature = ${result.current.temp_c} °C`; // Added unit
        cityNameElement.classList.remove("error-message"); // Remove error style if previously added
    } else {
        cityNameElement.innerText = `Error: ${result.error}`; // Display error message in the UI
        cityNameElement.classList.add("error-message"); // Add error style
        cityTimeElement.innerText = '';
        cityTempElement.innerText = '';
    }
});
