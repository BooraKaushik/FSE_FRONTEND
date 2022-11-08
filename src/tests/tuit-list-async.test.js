import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";
import Tuit from "../components/tuits/tuit";

jest.mock("axios");

const MOCKED_TUITS = [
  {
    tuit: "alice's tuit",
    postedOn: "2021-12-25T00:00:00.000Z",
    postedBy: "6368459486f613a4a6c8c35e",
  },
  {
    tuit: "charlie's tuit",
    postedOn: "2021-12-25T00:00:00.000Z",
    postedBy: "6368459486f613a4a6c8c35e",
  },
  {
    tuit: "bob's tuit",
    postedOn: "2021-12-25T00:00:00.000Z",
    postedBy: "6368459486f613a4a6c8c35e",
  },
];

test("tuit list renders mocked", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { tuits: MOCKED_TUITS } })
  );
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      {tuits.map((tuit) => (
        <Tuit key={tuit.tuit} tuit={tuit} />
      ))}
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});
