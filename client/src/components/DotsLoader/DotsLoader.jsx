import "./DotsLoader.css";

function DotsLoader() {
  return (
    <article className="loader-box">
      <h3 className="loader-title">Chargement des données...</h3>
      <div className="dots-loader">
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

export default DotsLoader;
