if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // fetch the posts
  await fetch(location.origin + "/index.json")
    .then((response) => response.json())
    .then((json) => {
      const documents = json;
      const results_list = document.querySelector(".results");
      const search_btn = document.querySelector(".search_btn");
      const search_modal = document.getElementById("search_modal");
      const search_input = document.querySelector(".search_input");
      const search_close = document.querySelector(".close");
      const results_text = document.querySelector(".results_text");

      search_close.onclick = () => {
        search_modal.style.display = "none";
      };

      const idx = lunr(function () {
        this.ref("id");
        this.field("title");
        this.field("summary");

        documents.forEach(function (doc, idx) {
          // assign id
          doc.id = idx;
          this.add(doc);
        }, this);
      });

      search_btn.addEventListener("click", (e) => {
        results_list.innerHTML = "";
        results_text.innerHTML = "";
        search_input.value = "";
        search_modal.style.display = "block";
        search_input.focus();
      });

      window.onclick = (event) => {
        if (event.target == search_modal) {
          search_modal.style.display = "none";
        }
      };

      search_input.addEventListener("keyup", (e) => {
        if (search_input.value) {
          results_list.innerHTML = "";
          var results = idx.search(search_input.value);

          if (results.length > 0) {
            results_text.innerHTML = `Found ${results.length} ${
              results.length == 1 ? "result" : "results"
            }.`;
          } else {
            results_text.innerHTML = `No results found for search term "${search_input.value}"`;
          }

          results.forEach((result) => {
            results_list.innerHTML += `<h3><a href="${
              documents[result.ref].url
            }">${documents[result.ref].title}</a></h3>`;
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
