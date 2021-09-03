class PostsJson {
    data() {
        return {
            template: '',
            layout: '', 
            permalink: "/index.json"
        }
    }

    render(data) {
        var posts = [];
        var id = 0;
        data.collections.post.map(post => {
            id++;
            posts.push({
                "id": id, 
                "title": post.data.title,
                "summary": post.data.summary,
                "slug": post.fileSlug,
                "url": post.url
            })
        })

        return JSON.stringify(posts);
    }
}

module.exports = PostsJson;