import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { DataProvider ,api } from "../../contexts/DataContext";

const mockData = {
  events: [
    {
      id: 1,
      title: "Event test",
      description: "test",
      date: "2022-01-01T00:00:00.000Z",
      cover: "/image.png",
      type: "Test"
    }
  ]
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    api.loadData = jest.fn().mockResolvedValue(mockData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Prénom")).toBeInTheDocument();
    expect(
      screen.getByText("Personel / Entreprise")
    ).toBeInTheDocument();
  });

  it("the success message is displayed after clicking Envoyer", async () => {
    api.loadData = jest.fn().mockResolvedValue(mockData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    const submitButton = await screen.findByText("Envoyer");
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Message envoyé !")
    ).toBeInTheDocument();
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockResolvedValue(mockData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    const events = await screen.findAllByText("Event test");
    expect(events.length).toBeGreaterThan(0);
  });

  it("a list of people is displayed", async () => {
    api.loadData = jest.fn().mockResolvedValue(mockData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    expect(await screen.findByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("a footer is displayed", async () => {
    api.loadData = jest.fn().mockResolvedValue(mockData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    expect(
      await screen.findByText("Contactez-nous")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Notre derniére prestation")
    ).toBeInTheDocument();
  });
});
