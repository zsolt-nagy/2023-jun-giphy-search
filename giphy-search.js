// In a serious application where you have something to protect, don't expose
// your API key like this. In this case, this API key exposure is innocent.
const API_KEY = "8Ksm9F2FkrFukj7mlCAVbAl6eX76xn3u";

function renderGifs(response) {
    const gifData = response.data;
    let html = "";
    if (gifData.length === 0) {
        html = '<div class="error">No matches were found. Please try another expression.</div>';
    } else {
        for (let gif of gifData) {
            let url = gif.images.fixed_height.url;
            let alt = gif.title;
            html += `<img src="${url}" alt="${alt}" class="giphy-img" />`;
        }
    }
    document.querySelector(".js-results-section").innerHTML = html;
}

function queryResults(topic, num) {
    fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${topic}&limit=${num}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    )
        .then((x) => x.json())
        .then(renderGifs);
}

function formSubmitted(event) {
    event.preventDefault();
    let queriedTopic = document.querySelector("[name=gif-content]").value;
    queriedTopic = queriedTopic.trim();
    queriedTopic = encodeURIComponent(queriedTopic);
    let numOfGifs = document.querySelector("[name=number-of-gifs]").value;
    queryResults(queriedTopic, numOfGifs);
}

document.querySelector(".js-gif-search-form").addEventListener("submit", formSubmitted);
