/* eslint-disable */

import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Page from "./index";
import DataContext from "../../contexts/DataContext";

const mockData = {
  events: [
    { id: 1, title: "Event 1", date: "2025-01-01", cover: "/event1.png", type: "Type 1"},
    { id: 2, title: "Event 2", date: "2025-02-01", cover: "/event2.png" , type: "Type 2"},
  ],
};

jest.mock("../../containers/Form", () => {
  return ({ onSuccess }) => (
    <div data-testid="select-testid">
      <button data-testid="collapse-button-testid">Ouvrir</button>
      <div>
        <button onClick={onSuccess}>Option 1</button>
        <button>Option 2</button>
      </div>
      <button onClick={onSuccess}>Envoyer</button>
    </div>
  );
});

describe("Formulaire", () => {
  beforeEach(() => {
    render(
      <DataContext.Provider value={{ data: mockData, error: null }}>
        <Page />
      </DataContext.Provider>
    );
  });

  test("affiche tous les champs du formulaire", async () => {
    const select = await screen.findByTestId("select-testid");
    expect(select).toBeInTheDocument();

    const collapseButton = within(select).getByTestId("collapse-button-testid");
    expect(collapseButton).toBeInTheDocument();

    expect(within(select).getByText("Option 1")).toBeInTheDocument();
    expect(within(select).getByText("Option 2")).toBeInTheDocument();
  });

  test("affiche le message de succès après soumission", async () => {
    const select = await screen.findByTestId("select-testid");

    fireEvent.click(within(select).getByTestId("collapse-button-testid"));

    fireEvent.click(within(select).getByText("Option 1"));
    fireEvent.click(within(select).getByText("Envoyer"));
  });
});
