import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error when user starts typing
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Use relative path - works on localhost and Vercel
      const apiUrl = process.env.REACT_APP_API_URL || '/api/contact'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Try to parse JSON, but handle cases where response isn't valid JSON
      let data = {}
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json()
        } catch (jsonError) {
          console.error('Failed to parse JSON response:', jsonError)
          data = { message: 'Server error occurred. Please check your MongoDB Atlas connection.' }
        }
      }

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`)
      }

      // Success
      setIsSubmitted(true)
      setFormData({ fullname: '', email: '', message: '' })

      // Clear success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.fullname && formData.email && formData.message

  return (
    <article className="contact active">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>
      <section className="mapbox">
        <figure>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119103.78190227155!2d78.9629!3d21.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ff28ff28ff29%3A0x1!2sNagpur%2C%20India!5e0!3m2!1sen!2sin!4v1647608789441" 
            width="400" 
            height="300" 
            loading="lazy"
            title="Nagpur Location"
          ></iframe>
        </figure>
      </section>
      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              value={formData.fullname}
              onChange={handleChange}
              disabled={isLoading}
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
          ></textarea>
          <button 
            className="form-btn" 
            type="submit" 
            disabled={!isFormValid || isLoading}
          >
            <ion-icon name="paper-plane"></ion-icon>
            <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
          </button>
          {isSubmitted && (
            <p className="submit-message" style={{ color: '#2dd4bf', marginTop: '1rem' }}>
              ✅ Message sent successfully! Thank you for reaching out.
            </p>
          )}
          {error && (
            <div style={{ marginTop: '1rem' }}>
              <p className="submit-message" style={{ color: '#ef4444' }}>
                ❌ {error}
              </p>
              {error.includes('Database') && (
                <p style={{ color: '#fbbf24', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  ℹ️ MongoDB cluster may not be running. Check your cluster status in MongoDB Atlas.
                </p>
              )}
            </div>
          )}
        </form>
      </section>
    </article>
  )
}
