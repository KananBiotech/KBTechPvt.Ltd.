import { useEffect } from "react";
import "./index.css";
import Header from "./Components/Header";


function App() {

  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HEADER */}
      <Header/>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Our <span>National Award Winning</span><br />
            Biotechnology Solutions
          </h1>
          <p>
            Innovative sanitation, agriculture and biotechnology solutions
            transforming industries with sustainable science.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn-primary">Discover More</a>
            <a href="#" className="btn-secondary">Send Enquiry</a>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section>
        <div className="container">
          <div className="section-title">
            <h2>Our Solutions</h2>
          </div>

          <div className="cards">
            <div className="card left">
              <h3>Sanitation Technology</h3>
              <p>Eco-friendly sanitation and waste management solutions.</p>
            </div>

            <div className="card center">
              <h3>Agriculture & Fisheries</h3>
              <p>AI-driven disease detection and bio-products.</p>
            </div>

            <div className="card right">
              <h3>Biotechnology Research</h3>
              <p>Advanced biotech innovations for sustainable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 Organica Biotech. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;
