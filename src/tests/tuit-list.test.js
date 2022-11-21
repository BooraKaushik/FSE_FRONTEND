import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import Tuit from "../components/tuits/tuit";
import { buildArgv } from "jest-cli/build/cli";

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

test("tuit list renders static tuit array", () => {
  render(
    <HashRouter>
      {MOCKED_TUITS.map((tuit) => (
        <Tuit tuit={tuit} />
      ))}
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test("tuit list renders async", async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      {tuits.map((tuit) => (
        <Tuit key={tuit.tuit} tuit={tuit} />
      ))}
    </HashRouter>
  );
  const tuit = screen.getByText(/@TESTTSTS Dragon spacecraft/i);
  expect(tuit).toBeInTheDocument();
});