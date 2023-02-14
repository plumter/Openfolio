import "../common/server";
import {waitFor, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { logoutUser, startApp, waitForToastMessage } from "../common/base";

// Start App
beforeEach(async () => {
  await startApp("/",  BrowserRouter);
});

describe("Home Page Test", _ => {
  it('Test Home Page View', async () => {
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });

  it('Test Fail Sign-in Link Request', async () => {
    // Input Email and password then Submit
    userEvent.type(screen.getByPlaceholderText('example@mail.com'), 'eni@plumter.com',);
    // Wait for validation debounce
    await act(() => new Promise(r => setTimeout(r, 80)));
    userEvent.click(screen.getByText("Send Sign-In Link"));

    // Wait For Error message
    await waitForToastMessage("Invalid Request");
  });

  it('Test Successful Sign-in Link Request', async () => {
    // Input Email and password then Submit
    userEvent.type(screen.getByPlaceholderText('example@mail.com'), 'hammed@plumter.com',);
    // Wait for validation debounce
    await act(() => new Promise(r => setTimeout(r, 80)));
    userEvent.click(screen.getByText("Send Sign-In Link"));

    // Wait For Success View
    await act(() => new Promise(r => setTimeout(r, 100)));
    await waitFor(() => screen.getByText("Sign-In Link Sent"));
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });

});