import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./index";

test("appelle onSuccess quand tous les champs sont remplis", async () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();

  render(<Form onSuccess={onSuccess} onError={onError} />);

  // remplir les champs
  fireEvent.change(screen.getByLabelText("Nom"), { target: { value: "Dupont" } });
  fireEvent.change(screen.getByLabelText("Prénom"), { target: { value: "Jean" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@mail.com" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour !" } });

  // Sélectionner le type via le Select
  fireEvent.click(screen.getByTestId("collapse-button-testid")); // ouvre le menu
  fireEvent.click(await screen.findByText("Personel")); // clique sur l'option

  // soumettre
  fireEvent.click(screen.getByText("Envoyer"));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalled();
  });
});
