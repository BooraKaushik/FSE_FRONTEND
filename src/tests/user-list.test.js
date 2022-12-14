import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import UserList from "../components/profile/user-list";
import { findAllUsers } from "../services/users-service";

const MOCKED_USERS = [
  {
    username: "ellen_ripley",
    password: "lv426",
    email: "repley@weyland.com",
    _id: "123",
  },
  {
    username: "sarah_conor",
    password: "illbeback",
    email: "sarah@bigjeff.com",
    _id: "234",
  },
];

test("user list renders static user array", () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

test("user list renders from REST API", async () => {
  const users = await findAllUsers();
  render(
    <HashRouter>
      <UserList users={users} />
    </HashRouter>
  );
  const user = screen.getByText(/alice/i);
  expect(user).toBeInTheDocument();
});
