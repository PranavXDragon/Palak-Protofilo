import { useState } from 'react'
import TestimonialsModal from '../TestimonialsModal'

const testimonials = [
  {
    id: 1,
    name: 'Daniel lewis',
    avatar: '/avatar-1.png',
    text: 'Palak was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
  },
  {
    id: 2,
    name: 'Jessica miller',
    avatar: '/avatar-2.png',
    text: 'Palak was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
  },
  {
    id: 3,
    name: 'Emily evans',
    avatar: '/avatar-3.png',
    text: 'Palak was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
  },
  {
    id: 4,
    name: 'Henry william',
    avatar: '/avatar-4.png',
    text: 'Palak was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.'
  }
]

const services = [
  { id: 1, title: 'Web design', icon: '/icon-design.svg', text: 'The most modern and high-quality design made at a professional level.' },
  { id: 2, title: 'Web development', icon: '/icon-dev.svg', text: 'High-quality development of sites at the professional level.' },
  { id: 3, title: 'Mobile apps', icon: '/icon-app.svg', text: 'Professional development of applications for iOS and Android.' },
  { id: 4, title: 'Photography', icon: '/icon-photo.svg', text: 'I make high-quality photos of any category at a professional level.' }
]

export default function About() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTestimonialClick = (testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTestimonial(null)
  }

  return (
    <>
      <article className="about active">
        <header>
          <h2 className="h2 article-title">About me</h2>
        </header>
        <section className="about-text">
          <p>
            I'm a passionate B.Tech Data Science student from Suryoday College of Engineering, Nagpur, with a strong interest in technology, problem-solving, and creating meaningful digital experiences. I enjoy turning complex data and ideas into simple, smart, and user-friendly solutions.
          </p>
          <p>
            My focus is on building projects that are not only functional but also clean, intuitive, and impactful. Along with data science, I explore web development and design to create solutions that are both technically strong and visually appealing.
          </p>
          <p>
            I constantly work on improving my skills through real-world projects, learning new tools, and experimenting with ideas. My goal is to grow as a data-driven problem solver and build innovative solutions that make a difference.
          </p>
        </section>

        <section className="service">
          <h3 className="h3 service-title">What i'm doing</h3>
          <ul className="service-list">
            {services.map(service => (
              <li className="service-item" key={service.id}>
                <div className="service-icon-box">
                  <img src={service.icon} alt={service.title} width={40} />
                </div>
                <div className="service-content-box">
                  <h4 className="h4 service-item-title">{service.title}</h4>
                  <p className="service-item-text">{service.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="testimonials">
          <h3 className="h3 testimonials-title">Testimonials</h3>
          <ul className="testimonials-list has-scrollbar">
            {testimonials.map(testimonial => (
              <li className="testimonials-item" key={testimonial.id}>
                <div className="content-card" onClick={() => handleTestimonialClick(testimonial)} style={{ cursor: 'pointer' }}>
                  <figure className="testimonials-avatar-box">
                    <img src={testimonial.avatar} alt={testimonial.name} width={60} />
                  </figure>
                  <h4 className="h4 testimonials-item-title">{testimonial.name}</h4>
                  <div className="testimonials-text">
                    <p>{testimonial.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <TestimonialsModal 
          testimonial={selectedTestimonial} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </article>
    </>
  )
}
