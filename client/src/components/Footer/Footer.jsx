import { useEffect, useState } from "react";
import connexion from "../../services/connexion";
import "./Footer.css";

function Footer() {
  const [quote, setQuote] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await connexion.get("/api/quote");
      setQuote(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <footer>
      <section>
        <p>Copyright © 2024</p>
        <p>Lubin Chauvreau</p>
        <p>06 . 72 . 14 . 43 . 08</p>
        <p>lubin-chauvreau@laposte.net</p>
        <p>{quote}</p>
      </section>
    </footer>
  );
}

export default Footer;
