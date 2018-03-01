import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import App from "./App";
import Login from "./Login";
import BlogList from "./BlogList";

const axiosMock = new MockAdapter(axios);

it("renders login when user not logged in", () => {
  axiosMock.onGet("/api/blogs").replyOnce(200, []);
  const appComponent = shallow(<App />);
  expect(appComponent.find(Login)).toBePresent();
  expect(appComponent.find(BlogList)).not.toBePresent();
});

it("renders bloglist when user logged in", async () => {
  const blogs = [{ author: "Luke", title: "Asd", user: { _id: 1 } }];
  axiosMock.onGet("/api/blogs").replyOnce(200, blogs);
  localStorage.setItem("user", JSON.stringify({ id: 1 }));
  const appComponent = shallow(<App />);
  await new Promise(setImmediate);
  appComponent.update();
  const blogListComponent = appComponent.find(BlogList);
  expect(blogListComponent).toBePresent();
  expect(blogListComponent).toHaveProp("blogs", [
    { ...blogs[0], canDelete: true }
  ]);
});
