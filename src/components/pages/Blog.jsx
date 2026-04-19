const blogPosts = [
  { id: 1, title: 'Design conferences in 2022', image: '/blog-1.jpg', category: 'Design', date: 'Feb 23, 2022', excerpt: 'Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.' },
  { id: 2, title: 'Best fonts every designer', image: '/blog-2.jpg', category: 'Design', date: 'Feb 23, 2022', excerpt: 'Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.' },
  { id: 3, title: 'Design digest #80', image: '/blog-3.jpg', category: 'Design', date: 'Feb 23, 2022', excerpt: 'Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.' },
  { id: 4, title: 'UI interactions of the week', image: '/blog-4.jpg', category: 'Design', date: 'Feb 23, 2022', excerpt: 'Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.' }
]

export default function Blog() {
  return (
    <article className="blog active">
      <header>
        <h2 className="h2 article-title">Blog</h2>
      </header>
      <section className="blog-posts">
        <ul className="blog-posts-list">
          {blogPosts.map(post => (
            <li className="blog-post-item" key={post.id}>
              <a href="#">
                <figure className="blog-banner-box">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </figure>
                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.category}</p>
                    <span className="dot" />
                    <time dateTime="2022-02-23">{post.date}</time>
                  </div>
                  <h3 className="h3 blog-item-title">{post.title}</h3>
                  <p className="blog-text">{post.excerpt}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

