import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange }) => {
  // Génère un ID unique pour éviter les duplications
  const uniqueId = `${name}-${Math.random().toString(36).substr(2, 9)}`;

  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          id={uniqueId}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          id={uniqueId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid="field-testid"
        />
      );
      break;
    default:
      component = (
        <input
          id={uniqueId}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid="field-testid"
        />
      );
  }

  return (
    <div className="inputField">
      {/* Label en gras */}
      <label htmlFor={uniqueId} className="label-bold">
        {label}
      </label>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, 
  ]),
  
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
};

export default Field;
