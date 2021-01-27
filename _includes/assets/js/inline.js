if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}



document.addEventListener('DOMContentLoaded', async () => {
  const search = document.querySelector('.search') || null;
  const loading = document.getElementById('loading-text');

  if (search) {
    loading.style.display = "block";
    await fetch('../index.json').then(response => response.json()).then(json => {
        const documents = json;
        const results_list = document.getElementById('results');
          var idx = lunr(function () {
            this.ref('id')
            this.field('title')
            // TODO: add body


            documents.forEach(function (doc, idx) {
              // assign id
              console.log(doc);
              doc.id = idx;
              this.add(doc)
            }, this)
          })

          console.log(idx);

          search.addEventListener('keyup', (e) => {
            if (search.value) {
            console.log(search.value);
            results_list.innerHTML = '';
            var results = idx.search(search.value);

            console.log(results);

            results.forEach(r => {
              console.log(r);
              results_list.innerHTML += `<li>${documents[r.ref].title}</li>`
            }); 
            }
          })
          loading.style.display = "none";
    }).catch(err => {
      console.log(err);
      loading.style.color = "red";
      search.setAttribute("disabled", true);
      loading.innerText = "An error occurred attempting to get the posts. Please try again later. "
    })
  } 
})
