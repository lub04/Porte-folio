import "./InputForm.css";

function InputForm({ handleSubmit, handleModify, name, value, label }) {
  return (
    <form onSubmit={handleSubmit} className="input-form">
      <label className="normal-text-input">
        {label}
        <input
          type="text"
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
