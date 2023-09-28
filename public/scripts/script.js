        const accessKey = "LLK4eOv2Bd_LFCqIczXPkdwmbfCrAmPm6VHacnB4qEI";
        const formEl = document.querySelector("form");
        const inputEl = document.getElementById("input");
        const searchResults = document.querySelector(".search-results");
        const showMore = document.getElementById("show-more");
        let inputData = "";
        let page = 1;
        // Function to handle the logout button click event
        function handleLogout() {
            localStorage.removeItem("Email");
            window.location.href = "login.html";
        }
        const logoutButton = document.getElementById("logout");
        logoutButton.addEventListener("click", handleLogout);

        function createDownloadButton(imageUrl) {
            const viewButton = document.createElement('button');
            viewButton.innerText = 'View';
            viewButton.classList.add('download-button');
            viewButton.addEventListener('click', () => {
                window.open(imageUrl, '_blank'); 
            });
        
            return viewButton;
        }

document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("UserName");
    const usernameContainer = document.getElementById("username-container");

    if (username && usernameContainer) {
        usernameContainer.textContent = `Welcome, ${username}!😊`; 
    }
});

        
        async function searchImages() {
            inputData = inputEl.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
            await inputsubmitApi();

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                const data = await response.json();
                const results = data.results;
                if (page === 1) {
                    searchResults.innerHTML = "";
                }
                results.forEach((result) => {
                    const imageWrapper = document.createElement('div');
                    imageWrapper.classList.add('search-result');
                    const imageLink = document.createElement('a');
                    imageLink.href = result.links.html;
                    imageLink.target = "_blank";
                    const image = document.createElement('img');
                    image.src = result.urls.small;
                    image.alt = result.alt_description;
                    imageLink.appendChild(image);
                    imageWrapper.appendChild(imageLink);
                    const downloadButton = createDownloadButton(result.urls.full);
                    imageWrapper.appendChild(downloadButton);
                    searchResults.appendChild(imageWrapper);
                });
                page++;
                if (page > 1) {
                    showMore.style.display = "block";
                }
            } catch (error) {
                console.error(error);
            }
        }
        formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            page = 1;
            searchImages();
        });

        showMore.addEventListener("click", () => {
            searchImages();
        });
        async function inputsubmitApi() {
            const obj = {
                Email: localStorage.getItem("Email"),
                Input: inputEl.value,
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            };

            try {
                const response = await fetch('http://localhost:3000/inputsubmit', options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Response from server:', data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
