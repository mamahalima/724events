import { fireEvent, render, screen } from "@testing-library/react";
import Field, { FIELD_TYPES } from "./index";

describe("Field component", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    name: "test-field",
  };

  it("renders the field with correct name", () => {
    render(<Field {...defaultProps} />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement).toBeInTheDocument();
    expect(fieldElement.name).toBe("test-field");
  });

  it("renders the placeholder correctly", () => {
    render(<Field {...defaultProps} placeholder="Enter text" />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement.placeholder).toBe("Enter text");
  });

  it("renders the label correctly", () => {
    render(<Field {...defaultProps} label="Nom" />);
    const labelElement = screen.getByText("Nom");
    expect(labelElement).toBeInTheDocument();
  });

  it("calls onChange when the value changes", () => {
    const onChangeMock = jest.fn();
    render(<Field {...defaultProps} onChange={onChangeMock} />);
    const fieldElement = screen.getByTestId("field-testid");

    fireEvent.change(fieldElement, { target: { value: "nouvelle valeur" } });
    expect(onChangeMock).toHaveBeenCalledWith("nouvelle valeur");
  });

  it("renders a text input for FIELD_TYPES.INPUT_TEXT", () => {
    render(<Field {...defaultProps} type={FIELD_TYPES.INPUT_TEXT} />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement.type).toBe("text");
  });

  it("renders a textarea for FIELD_TYPES.TEXTAREA", () => {
    render(<Field {...defaultProps} type={FIELD_TYPES.TEXTAREA} />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement.tagName.toLowerCase()).toBe("textarea");
  });

  it("defaults to text input if type is invalid", () => {
    render(<Field {...defaultProps} type="wrong-type" />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement.type).toBe("text");
  });
});
