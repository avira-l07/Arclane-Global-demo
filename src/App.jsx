import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundVideo from './components/BackgroundVideo';
import { FiLayout, FiSmartphone, FiDollarSign, FiCode, FiPenTool, FiSettings, FiCheck } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);
  const overlayRef = useRef(null);
  const [selectedService, setSelectedService] = useState('');
  const [activeTab, setActiveTab] = useState('head');
  const [activeNav, setActiveNav] = useState('home');
  const [formSuccess, setFormSuccess] = useState(false);

  // GSAP ScrollTrigger for the Grey/Blue Overlay
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
      
      // Starts at 0 (Hero), fades to 0.95 (Middle sections) for readability, fades back slightly at end
      tl.to(overlayRef.current, { opacity: 0.95, duration: 0.4, ease: "power1.inOut" })
        .to(overlayRef.current, { opacity: 0.7, duration: 0.6, ease: "power1.inOut" });
        
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    e.target.reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <>
      <BackgroundVideo />
      
      {/* Scroll Controlled Overlay */}
      <div ref={overlayRef} className="scroll-overlay"></div>

      <main ref={mainRef}>
        
        {/* --- HERO SECTION --- */}
        <section id="home" className="hero">
          <div className="hero-brand"><span>A</span>RCLANE GLOBAL</div>
          <h1>Designing Digital Futures<br/>with <span className="text-gradient">Intelligence</span> and<br/><span className="text-gradient">Innovation</span></h1>
          <p>Arclane Global builds powerful websites, apps, software, automation systems, and AI-powered solutions that help businesses grow smarter and faster.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>Start Your Project</button>
            <button className="btn-secondary" onClick={() => scrollToSection('services')}>Explore Services</button>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services">
          <h2 className="section-title">Our Services That <span className="text-gradient">Power Your Growth</span></h2>
          <p className="section-subtitle">From websites to AI-powered automation, we create digital solutions that help your business move ahead.</p>
          
          <div className="grid-3">
            {[
              { icon: <FiLayout />, title: "Website Development", desc: "High-performance, modern, and responsive web experiences tailored to your brand." },
              { icon: <FiSmartphone />, title: "App Development", desc: "Seamless and intuitive mobile applications for iOS and Android platforms." },
              { icon: <FiDollarSign />, title: "AI Solutions", desc: "Intelligent AI integration to automate tasks and provide actionable insights." },
              { icon: <FiCode />, title: "Software Development", desc: "Custom robust software architectures designed for scalability." },
              { icon: <FiPenTool />, title: "UI/UX Design", desc: "User-centric design that guarantees beautiful and logical navigation." },
              { icon: <FiSettings />, title: "Business Automation", desc: "Streamline your operations with smart digital workflows." }
            ].map((srv, index) => (
              <div key={index} className="glass-card" onClick={() => { setSelectedService(srv.title); scrollToSection('contact'); }}>
                <div className="service-icon">{srv.icon}</div>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- WHY CHOOSE US SECTION --- */}
        <section id="about">
          <h2 className="section-title">Why Choose <span className="text-gradient">Arclane Global?</span></h2>
          <p className="section-subtitle">We combine technology, creativity, and strategy to build digital solutions that help your business grow smarter, faster, and stronger.</p>
          
          <div className="grid-3">
            {[
              { title: "Modern Technology", desc: "We use latest tools, frameworks, and development practices to build future-ready digital products." },
              { title: "Custom Solutions", desc: "Every business is different, so we create solutions according to your goals, audience, and workflow." },
              { title: "Clean UI/UX", desc: "We design smooth, attractive, and easy-to-use interfaces that keep users engaged." },
              { title: "Business Growth Focus", desc: "Our main goal is to create digital systems that help your business get more leads, clients, and growth." },
              { title: "Fast Performance", desc: "We build websites and apps that load fast, work smoothly, and perform well on all devices." },
              { title: "Secure Development", desc: "We follow safe coding practices to protect your data, users, and business operations." },
              { title: "AI-Powered Approach", desc: "We bring AI, automation, and smart features to make your business more efficient and modern." },
              { title: "Long-Term Support", desc: "We do not just complete projects; we support your growth with updates, improvements, and guidance." }
            ].map((feat, index) => (
              <div key={index} className="glass-card">
                <div className="feature-icon-box"><FiCheck /></div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- HOW WE WORK SECTION --- */}
        <section>
          <h2 className="section-title">How We <span className="text-gradient">Work</span></h2>
          <p className="section-subtitle">Our process is simple, clear, and result-driven. From your first idea to final launch, we handle every step with planning, creativity, and precision.</p>
          
          <div className="grid-3 process-grid">
            {[
              { step: "STEP 01", title: "Understand Your Idea", desc: "We start by listening carefully to your vision, business needs, target users, and project goals. This helps us understand exactly what you want to build." },
              { step: "STEP 02", title: "Plan the Solution", desc: "After understanding your idea, we create a clear strategy, feature list, design direction, and development roadmap so the project moves in the right direction.", active: true },
              { step: "STEP 03", title: "Design the Experience", desc: "We design clean, modern, and user-friendly interfaces that make your product easy to use and attractive for your customers." },
              { step: "STEP 04", title: "Build the Product", desc: "Our team develops the website, app, software, or AI solution using clean code, modern tools, and scalable structure." },
              { step: "STEP 05", title: "Test and Improve", desc: "Before launch, we test speed, responsiveness, design, user experience, and functionality to make sure everything works smoothly." },
              { step: "STEP 06", title: "Launch and Support", desc: "After final approval, we help you launch your project and provide support for updates, improvements, and future growth." }
            ].map((process, index) => (
              <div key={index} className={`glass-card process-card ${process.active ? 'active' : ''}`}>
                <div className={`step-badge ${process.active ? 'active' : ''}`}>{process.step}</div>
                <h3>{process.title}</h3>
                <p>{process.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects">
          <h2 className="section-title">Our <span className="text-gradient">Projects</span></h2>
          <p className="section-subtitle">Take a look at some of the premium digital experiences we have crafted for our clients.</p>
          
          <div className="grid-3">
            {[
              { title: "FinTech Dashboard", desc: "AI Automation Dashboard", tags: ["React", "Python", "AI"] },
              { title: "E-Commerce App", desc: "Mobile App UI", tags: ["React Native", "Node.js"] },
              { title: "Corporate Portal", desc: "Custom Software", tags: ["Vue", "Django", "AWS"] }
            ].map((proj, index) => (
              <div key={index} className="glass-card project-card">
                <div className="project-image"></div>
                <div className="project-content">
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                  <div className="tags">
                    {proj.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- OFFLINE OFFICES SECTION --- */}
        <section>
          <h2 className="section-title">Our <span className="text-gradient">Offline Offices</span></h2>
          <div className="contact-container glass-card" style={{ padding: '3rem' }}>
            <div className="tabs-header">
              <button className={`tab-btn ${activeTab === 'head' ? 'active' : ''}`} onClick={() => setActiveTab('head')}>Head Office</button>
              <button className={`tab-btn ${activeTab === 'branch' ? 'active' : ''}`} onClick={() => setActiveTab('branch')}>Branch Office</button>
              <button className={`tab-btn ${activeTab === 'meeting' ? 'active' : ''}`} onClick={() => setActiveTab('meeting')}>Meeting Office</button>
            </div>
            
            <div className="office-info">
              <h3>{activeTab === 'head' ? 'Head Office' : activeTab === 'branch' ? 'Branch Office' : 'Meeting Office'}</h3>
              <p><span>Address:</span> {activeTab === 'head' ? '123 Cyber Avenue, Tech District, City' : activeTab === 'branch' ? '456 Innovation Park, Sector 5, City' : '789 Executive Plaza, Floor 12, City'}</p>
              <p><span>Phone:</span> {activeTab === 'head' ? '+91-XXXXXXXXXX' : activeTab === 'branch' ? '+91-YYYYYYYYYY' : '+91-ZZZZZZZZZZ'}</p>
              <p><span>Email:</span> {activeTab === 'head' ? 'headquarters@arclaneglobal.com' : activeTab === 'branch' ? 'branch@arclaneglobal.com' : 'meetings@arclaneglobal.com'}</p>
            </div>
            
            <div className="map-placeholder">Map View Not Available</div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact">
          <h2 className="section-title">Let’s Build Your Project <span className="text-gradient">Together</span></h2>
          <p className="section-subtitle">Share your idea with Arclane Global and our team will connect with you to discuss your project.</p>
          
          <div className="contact-container glass-card">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input type="text" required placeholder="Full Name" />
              <input type="text" placeholder="Organization / Company Name" />
              <input type="email" required placeholder="Email Address" />
              <input type="tel" required placeholder="Contact Number" />
              
              <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
                <option value="" disabled>Select a Service</option>
                <option value="Website Development">Website Development</option>
                <option value="App Development">App Development</option>
                <option value="AI Solutions">AI Solutions</option>
                <option value="Software Development">Software Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Business Automation">Business Automation</option>
              </select>
              
              <textarea required placeholder="Describe your project, idea, or business requirement..."></textarea>
              <button type="submit" className="submit-btn">Send Project Request</button>
              
              {formSuccess && <p style={{ gridColumn: '1 / -1', color: 'var(--cyan)', textAlign: 'center', marginTop: '1rem' }}>Thank you! We will get in touch shortly.</p>}
            </form>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Arclane Global</h2>
            <p>Arclane Global creates modern digital solutions, websites, apps, software, automation systems, and AI-powered tools for growing businesses.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" onClick={(e)=>{e.preventDefault(); scrollToSection('home');}}>Home</a></li>
              <li><a href="#services" onClick={(e)=>{e.preventDefault(); scrollToSection('services');}}>Services</a></li>
              <li><a href="#about" onClick={(e)=>{e.preventDefault(); scrollToSection('about');}}>About</a></li>
              <li><a href="#projects" onClick={(e)=>{e.preventDefault(); scrollToSection('projects');}}>Projects</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#" onClick={(e)=>e.preventDefault()}>Website Development</a></li>
              <li><a href="#" onClick={(e)=>e.preventDefault()}>App Development</a></li>
              <li><a href="#" onClick={(e)=>e.preventDefault()}>AI Solutions</a></li>
              <li><a href="#" onClick={(e)=>e.preventDefault()}>Software Development</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li>Phone: +91-XXXXXXXXXX</li>
              <li>Email: info@arclaneglobal.com</li>
              <li>Location: 123 Cyber Avenue, City</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Arclane Global. All Rights Reserved.
        </div>
      </footer>

      {/* --- FLOATING NAV --- */}
      <nav className="floating-nav">
        <a className={activeNav === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</a>
        <a className={activeNav === 'services' ? 'active' : ''} onClick={() => scrollToSection('services')}>Services</a>
        <a className={activeNav === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</a>
        <a className={activeNav === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</a>
        <a className={activeNav === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</a>
      </nav>
    </>
  );
}