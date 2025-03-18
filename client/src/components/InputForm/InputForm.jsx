import "./InputForm.css";

function InputForm({ handleSubmit, handleModify, name, value, label }) {
  return (
    <form onSubmit={handleSubmit} className="input-form">
      <label>
        {label}
        <input
          type="text"
          className="large-text-input"
          value={value}
          name={name}
          onChange={handleModify}
          required
        />
      </label>
      <button type="submit" className="button">
        Valider
      </button>
    </form>
  );
}

export default InputForm;
