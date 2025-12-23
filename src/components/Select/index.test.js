import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./index";

describe("Select component", () => {
  it("calls onChange with null when the 'Toutes' option is clicked", () => {
    const onChange = jest.fn();

    render(
      <Select
        selection={["value1", "value2"]}
        value=""
        onChange={onChange}
      />
    );

    // Ouvre le menu
    const button = screen.getByTestId("collapse-button-testid");
    fireEvent.click(button);

    // Récupère le radio "Toutes" pour null
    const allOption = screen.getByRole("radio", { name: "Toutes" });
    fireEvent.click(allOption);

    // Vérifie que onChange a été appelé avec null
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("calls onChange with the correct value when a selection is clicked", () => {
    const onChange = jest.fn();

    render(
      <Select
        selection={["value1", "value2"]}
        value=""
        onChange={onChange}
      />
    );

    // Ouvre le menu
    const button = screen.getByTestId("collapse-button-testid");
    fireEvent.click(button);

    // Clique sur "value1"
    const optionValue1 = screen.getByRole("radio", { name: "value1" });
    fireEvent.click(optionValue1);

    // Vérifie que onChange a été appelé avec "value1"
    expect(onChange).toHaveBeenCalledWith("value1");
  });
});
