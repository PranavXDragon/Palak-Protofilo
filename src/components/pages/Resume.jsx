export default function Resume() {
  const education = [
    { title: 'Suryodaya College of Engineering & Technology', years: '2024 — 2028', description: 'B.Tech Data Science - Currently in 2nd year pursuing degree with focus on data analysis, machine learning, and problem-solving through real-world projects.' },
    { title: 'New york academy of art', years: '2006 — 2007', description: 'Ratione voluptatem sequi nesciunt, facere quisquams facere menda ossimus, omnis voluptas assumenda est omnis..' },
    { title: 'High school of art and design', years: '2002 — 2004', description: 'Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit aut fugit, sed consequuntur magni dolores eos.' }
  ]

  const skills = [
    { name: 'Web design', percentage: 80 },
    { name: 'Graphic design', percentage: 70 },
    { name: 'Branding', percentage: 90 },
    { name: 'WordPress', percentage: 50 }
  ]

  return (
    <article className="resume active">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          {education.map((item, idx) => (
            <li className="timeline-item" key={idx}>
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <span>{item.years}</span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          {skills.map((skill, idx) => (
            <li className="skills-item" key={idx}>
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.percentage}>{skill.percentage}%</data>
              </div>
              <div className="skill-progress-bg">
                <div className="skill-progress-fill" style={{width: `${skill.percentage}%`}} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
