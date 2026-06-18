import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundVideo from "./components/BackgroundVideo";
import {
  FiLayout,
  FiSmartphone,
  FiDollarSign,
  FiCode,
  FiPenTool,
  FiSettings,
  FiCheck,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <FiLayout />,
    title: "Website Development",
    desc: "High-performance, modern, and responsive web experiences tailored to your brand.",
  },
  {
    icon: <FiSmartphone />,
    title: "App Development",
    desc: "Seamless and intuitive mobile applications for iOS and Android platforms.",
  },
  {
    icon: <FiDollarSign />,
    title: "AI Solutions",
    desc: "Intelligent AI integration to automate tasks and provide actionable insights.",
  },
  {
    icon: <FiCode />,
    title: "Software Development",
    desc: "Custom robust software architectures designed for scalability.",
  },
  {
    icon: <FiPenTool />,
    title: "UI/UX Design",
    desc: "User-centric design that guarantees beautiful and logical navigation.",
  },
  {
    icon: <FiSettings />,
    title: "Business Automation",
    desc: "Streamline your operations with smart digital workflows.",
  },
];

const features = [
  {
    title: "Modern Technology",
    desc: "We use latest tools, frameworks, and development practices to build future-ready digital products.",
  },
  {
    title: "Custom Solutions",
    desc: "Every business is different, so we create solutions according to your goals, audience, and workflow.",
  },
  {
    title: "Clean UI/UX",
    desc: "We design smooth, attractive, and easy-to-use interfaces that keep users engaged.",
  },
  {
    title: "Business Growth Focus",
    desc: "Our main goal is to create digital systems that help your business get more leads, clients, and growth.",
  },
  {
    title: "Fast Performance",
    desc: "We build websites and apps that load fast, work smoothly, and perform well on all devices.",
  },
  {
    title: "Secure Development",
    desc: "We follow safe coding practices to protect your data, users, and business operations.",
  },
  {
    title: "AI-Powered Approach",
    desc: "We bring AI, automation, and smart features to make your business more efficient and modern.",
  },
  {
    title: "Long-Term Support",
    desc: "We do not just complete projects; we support your growth with updates, improvements, and guidance.",
  },
];

const workSteps = [
  {
    step: "STEP 01",
    title: "Understand Your Idea",
    desc: "We start by listening carefully to your vision, business needs, target users, and project goals. This helps us understand exactly what you want to build.",
  },
  {
    step: "STEP 02",
    title: "Plan the Solution",
    desc: "After understanding your idea, we create a clear strategy, feature list, design direction, and development roadmap so the project moves in the right direction.",
    active: true,
  },
  {
    step: "STEP 03",
    title: "Design the Experience",
    desc: "We design clean, modern, and user-friendly interfaces that make your product easy to use and attractive for your customers.",
  },
  {
    step: "STEP 04",
    title: "Build the Product",
    desc: "Our team develops the website, app, software, or AI solution using clean code, modern tools, and scalable structure.",
  },
  {
    step: "STEP 05",
    title: "Test and Improve",
    desc: "Before launch, we test speed, responsiveness, design, user experience, and functionality to make sure everything works smoothly.",
  },
  {
    step: "STEP 06",
    title: "Launch and Support",
    desc: "After final approval, we help you launch your project and provide support for updates, improvements, and future growth.",
  },
];

const projects = [
  {
    title: "FinTech Dashboard",
    desc: "AI Automation Dashboard",
    tags: ["React", "Python", "AI"],
  },
  {
    title: "E-Commerce App",
    desc: "Mobile App UI",
    tags: ["React Native", "Node.js"],
  },
  {
    title: "Corporate Portal",
    desc: "Custom Software",
    tags: ["Vue", "Django", "AWS"],
  },
  {
    title: "SaaS Platform",
    desc: "Business Website",
    tags: ["Next.js", "Tailwind"],
  },
];

const offices = {
  head: {
    name: "Head Office",
    address: "123 Cyber Avenue, Tech District, City",
    phone: "+91-XXXXXXXXXX",
    email: "headquarters@arclaneglobal.com",
  },
  branch: {
    name: "Branch Office",
    address: "456 Innovation Park, Sector 5, City",
    phone: "+91-YYYYYYYYYY",
    email: "branch@arclaneglobal.com",
  },
  meeting: {
    name: "Meeting Office",
    address: "789 Executive Plaza, Floor 12, City",
    phone: "+91-ZZZZZZZZZZ",
    email: "meetings@arclaneglobal.com",
  },
};

const FORMSPREE_ID = "xeewwred";

export default function App() {
  const mainRef = useRef(null);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    full_name: "",
    organization: "",
    email: "",
    contact_number: "",
    service: "",
    message: "",
  });

  const [activeTab, setActiveTab] = useState("head");
  const [activeNav, setActiveNav] = useState("home");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (!mainRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(overlayRef.current, {
        opacity: 0.95,
        duration: 0.4,
        ease: "power1.inOut",
      }).to(overlayRef.current, {
        opacity: 0.7,
        duration: 0.6,
        ease: "power1.inOut",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Intersection Observer for Scroll-Spy Navigation
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;
    const topPosition =
      element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: topPosition, behavior: "smooth" });
  };

  const handleServiceClick = (serviceName) => {
    setFormData((prev) => ({
      ...prev,
      service: serviceName,
      message: `I am interested in ${serviceName}.`,
    }));
    scrollToSection("contact");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit directly via fetch with JSON — bypasses useForm hook DOM-reading issue
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(false);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          organization: formData.organization,
          email: formData.email,
          contact_number: formData.contact_number,
          service: formData.service,
          message: formData.message,
          _subject: "New project request from Arclane Global website",
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormData({
          full_name: "",
          organization: "",
          email: "",
          contact_number: "",
          service: "",
          message: "",
        });

        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        setFormError(true);
        setTimeout(() => setFormError(false), 5000);
      }
    } catch (err) {
      setFormError(true);
      setTimeout(() => setFormError(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <BackgroundVideo />

      <div ref={overlayRef} className="scroll-overlay"></div>

      <main ref={mainRef}>
        {/* HERO SECTION */}
        <section id="home" className="hero">
          <div className="hero-brand">
            <span>A</span>RCLANE GLOBAL
          </div>

          <h1>
            Designing Digital Futures
            <br />
            with <span className="text-gradient">Intelligence</span> and
            <br />
            <span className="text-gradient">Innovation</span>
          </h1>

          <p>
            Arclane Global builds powerful websites, apps, software, automation
            systems, and AI-powered solutions that help businesses grow smarter
            and faster.
          </p>

          <div className="hero-btns">
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToSection("contact")}
            >
              Start Your Project
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => scrollToSection("services")}
            >
              Explore Services
            </button>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services">
          <h2 className="section-title">
            Our Services That{" "}
            <span className="text-gradient">Power Your Growth</span>
          </h2>

          <p className="section-subtitle">
            From websites to AI-powered automation, we create digital solutions
            that help your business move ahead.
          </p>

          <div className="grid-3">
            {services.map((srv) => (
              <div
                key={srv.title}
                className="glass-card"
                onClick={() => handleServiceClick(srv.title)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleServiceClick(srv.title);
                  }
                }}
              >
                <div className="service-icon">{srv.icon}</div>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section id="about">
          <h2 className="section-title">
            Why Choose <span className="text-gradient">Arclane Global?</span>
          </h2>

          <p className="section-subtitle">
            We combine technology, creativity, and strategy to build digital
            solutions that help your business grow smarter, faster, and
            stronger.
          </p>

          <div className="grid-3">
            {features.map((feat) => (
              <div key={feat.title} className="glass-card">
                <div className="feature-icon-box">
                  <FiCheck />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW WE WORK SECTION */}
        <section id="work">
          <h2 className="section-title">
            How We <span className="text-gradient">Work</span>
          </h2>

          <p className="section-subtitle">
            Our process is simple, clear, and result-driven. From your first
            idea to final launch, we handle every step with planning,
            creativity, and precision.
          </p>

          <div className="grid-3 process-grid">
            {workSteps.map((process) => (
              <div
                key={process.step}
                className={`glass-card process-card ${
                  process.active ? "active" : ""
                }`}
              >
                <div
                  className={`step-badge ${process.active ? "active" : ""}`}
                >
                  {process.step}
                </div>
                <h3>{process.title}</h3>
                <p>{process.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <h2 className="section-title">
            Our <span className="text-gradient">Projects</span>
          </h2>

          <p className="section-subtitle">
            Take a look at some of the premium digital experiences we have
            crafted for our clients.
          </p>

          <div className="grid-3">
            {projects.map((proj) => (
              <div key={proj.title} className="glass-card project-card">
                <div className="project-image"></div>

                <div className="project-content">
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>

                  <div className="tags">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OFFLINE OFFICES SECTION */}
        <section id="offices">
          <h2 className="section-title">
            Our <span className="text-gradient">Offline Offices</span>
          </h2>

          <div
            className="contact-container glass-card"
            style={{ padding: "3rem" }}
          >
            <div className="tabs-header">
              {Object.keys(offices).map((officeKey) => (
                <button
                  key={officeKey}
                  type="button"
                  className={`tab-btn ${
                    activeTab === officeKey ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(officeKey)}
                >
                  {offices[officeKey].name}
                </button>
              ))}
            </div>

            <div className="office-info">
              <h3>{offices[activeTab].name}</h3>
              <p>
                <span>Address:</span> {offices[activeTab].address}
              </p>
              <p>
                <span>Phone:</span> {offices[activeTab].phone}
              </p>
              <p>
                <span>Email:</span> {offices[activeTab].email}
              </p>
            </div>

            <div className="map-placeholder">Map View Not Available</div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <h2 className="section-title">
            Let's Build Your Project{" "}
            <span className="text-gradient">Together</span>
          </h2>

          <p className="section-subtitle">
            Share your idea with Arclane Global and our team will connect with
            you to discuss your project.
          </p>

          <div className="contact-container glass-card">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                placeholder="Full Name"
              />

              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Organization / Company Name"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email Address"
              />

              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleInputChange}
                required
                placeholder="Contact Number"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a Service
                </option>
                <option value="Website Development">Website Development</option>
                <option value="App Development">App Development</option>
                <option value="AI Solutions">AI Solutions</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Business Automation">Business Automation</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Describe your project, idea, or business requirement..."
              ></textarea>

              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Project Request"}
              </button>

              {formSuccess && (
                <p
                  style={{
                    gridColumn: "1 / -1",
                    color: "var(--cyan)",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  Thank you! Your project request has been received. Arclane
                  Global will contact you soon.
                </p>
              )}

              {formError && (
                <p
                  style={{
                    gridColumn: "1 / -1",
                    color: "#ff6b6b",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Arclane Global</h2>
            <p>
              Arclane Global creates modern digital solutions, websites, apps,
              software, automation systems, and AI-powered tools for growing
              businesses.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("home");
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("services");
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              {services.slice(0, 4).map((srv) => (
                <li key={srv.title}>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleServiceClick(srv.title);
                    }}
                  >
                    {srv.title}
                  </a>
                </li>
              ))}
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
          &copy; {new Date().getFullYear()} Arclane Global. All Rights Reserved.
        </div>
      </footer>

      {/* FLOATING NAV */}
      <nav className="floating-nav">
        <a
          href="#home"
          className={activeNav === "home" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          Home
        </a>

        <a
          href="#services"
          className={activeNav === "services" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("services");
          }}
        >
          Services
        </a>

        <a
          href="#about"
          className={activeNav === "about" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
        >
          About
        </a>

        <a
          href="#projects"
          className={activeNav === "projects" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("projects");
          }}
        >
          Projects
        </a>

        <a
          href="#contact"
          className={activeNav === "contact" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
        >
          Contact
        </a>
      </nav>
    </>
  );
}
