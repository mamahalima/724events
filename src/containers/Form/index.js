import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      // Vérification des champs
      const allFilled = Object.values(formValues).every((val) => val && val.trim() !== "");
      if (!allFilled) {
        setError("Veuillez remplir tous les champs !");
        setSending(false);
        document.activeElement.blur();
        return;
      }

      setError("");
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [formValues, onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field label="Nom" value={formValues.nom} onChange={handleChange("nom")} />
          <Field label="Prénom" value={formValues.prenom} onChange={handleChange("prenom")} />
          <Select
            selection={["Personel", "Entreprise"]}
            value={formValues.type}
            onChange={handleChange("type")}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            data-testid="select-type"
          />
          <Field label="Email" value={formValues.email} onChange={handleChange("email")} />
          <Button
  type={BUTTON_TYPES.SUBMIT}
  disabled={sending}
  data-testid="submit-button"
>
  {sending ? "En cours" : "Envoyer"}
</Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formValues.message}
            onChange={handleChange("message")}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
