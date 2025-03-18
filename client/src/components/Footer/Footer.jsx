import { useEffect, useState } from "react";

import connexion from "../../services/connexion";
import "./Footer.css";

function Footer() {
  const [quote, setQuote] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await connexion.get("/api/quote?purpose=random");
      setQuote(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <section>
        <p>{quote.quote}</p>
        <small>{quote.author}</small>
      </section>
      <section>
        <p className="footer-contact">Copyright © 2024</p>
        <p className="footer-contact">Lubin Chauvreau</p>
        <p className="footer-contact">06 . 72 . 14 . 43 . 08</p>
        <p className="footer-contact">lubin-chauvreau@laposte.net</p>
      </section>
      <section className="arrow">
        <button
          className="no-button arrow-up-button"
          type="button"
          onClick={scrollToTop}
        >
          &#x2B9D;
        </button>
      </section>
    </footer>
  );
}

export default Footer;
