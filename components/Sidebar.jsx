export default function Sidebar() {
  return (
    <aside className="sidebar">
      <figure className="sidebar-img">
        <img 
          src="/assets/images/my-avatar.png" 
          alt="Palak Urkude" 
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
        />
      </figure>
      <h1>Palak Urkude</h1>
      <p className="sidebar-title">Web Developer</p>
      
      <div className="sidebar-info">
        <div className="info-item">
          <p className="info-title">EMAIL</p>
          <a href="mailto:palakurkude200@gmail.com">palakurkude200@g...</a>
        </div>
        <div className="info-item">
          <p className="info-title">LOCATION</p>
          <address>Nagpur, India</address>
        </div>
      </div>
    </aside>
  );
}
