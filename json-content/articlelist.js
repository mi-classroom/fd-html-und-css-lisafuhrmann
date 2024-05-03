const articleListURL =
  "https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json";

document.addEventListener("DOMContentLoaded", function () {
  initArticleList();
});

function initArticleList() {
  const responsePromise = fetch(articleListURL);
  responsePromise.then(function (response) {
    const dataPromise = response.json();
    dataPromise.then(function (data) {
      renderArticleList(data.articles);
    });
  });
}

function renderArticleList(articles) {
  articleListElement = document.querySelector("[data-js-generate-articlelist]");
  const cards = articles
    .map(function (article) {
      return `<li>
      <figure>
        <img src="./images/${article.teaserImg}" alt="${article.title}">
          <figcaption>
          <h3>${article.title}</h3>
          <adress>${article.author}</adress>
            <ul class="tag-list">
            ${article.tags.fileFormat
              .map((tag) => `<li>${tag}</li>\n`)
              .join("")}
            ${article.tags.keywords.map((tag) => `<li>${tag}</li>\n`).join("")}
            ${article.tags.modules.map((tag) => `<li>${tag}</li>\n`).join("")}
            ${article.tags.projectphase
              .map((tag) => `<li>${tag}</li>\n`)
              .join("")}
            </ul>
          </figcaption>
      </figure>
    </li>`;
    })
    .join("");
  articleListElement.innerHTML = cards;
}
