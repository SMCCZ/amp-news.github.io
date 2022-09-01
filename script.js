let elem = document.getElementById("lightBox");
let heading = document.getElementById("hello");
let apiKey = "https://inshorts.deta.dev/news?category=";
changeColor = function () {
  if (heading.style.color == "red") {
    heading.style.color = "green";
  } else {
    heading.style.color = "red";
  }
};
let seachButton = document.getElementById("search-button");
let newsView = document.getElementById("news-view");
let ampStoryView = document.getElementById("news-view-story");
let searchField = document.getElementById("search");
seachButton.addEventListener("click", function () {
  newsView.innerHTML = `<div color="red"></div>`;
  console.log("New get access started");
  searchField.value;
  getNews(searchField.value);
});
function getNews(query) {
  var allNewsDOM = "";
  var ampStories = "";
  console.log("Started getting news");
  fetch(apiKey+query)
    .then((response) => response.json())
    .then((temp) => {
      console.log(temp);
      for (let i in temp.data) {
        console.log(temp.data[i]);
        allNewsDOM += newsCard(
          temp.data[i]["author"],
          temp.data[i]["content"],
          temp.data[i]["imageUrl"]
        );
        ampStories += createStory(
          temp.data[i]["author"],
          temp.data[i]["content"],
          temp.data[i]["imageUrl"]
        );
      }
      newsView.innerHTML = allNewsDOM;
      ampStoryView.innerHTML = ampStories;
      //var news = News.fromJSON(temp.data[0]);
      console.log("News get completed...");
    });
}

//elem.addEventListener("click", changeColor);
function newsCard(author, content, imageUrl) {
  return `
  <div id="news-card">
  <amp-img
  alt="A view of the sea"
  src=${imageUrl}
  width="300"
  height="200"
  layout="fixed"
>
</amp-img>
  <h1>
      ${author}
  </h1>
  <p>
      ${content}
  </p>
  <div fallback>Not Loading !!!!</div>
</div>`;
}

function createStory(author, content, imageUrl) {
  return `<amp-story-page id=${imageUrl}>
    <amp-story-grid-layer template="fill">
      <amp-img
      src=${imageUrl}
        width="900"
        height="1600"
        alt=""
      >
      </amp-img>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <h1>${author}</h1>
      <p>
      ${content}
  </p>
    </amp-story-grid-layer>
  </amp-story-page>`;
}
