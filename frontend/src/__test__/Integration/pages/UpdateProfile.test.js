import "__test__/Integration/common/server";
import {screen, act} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { startApp, waitForToastMessage } from "__test__/Integration/common/base";
import userEvent from "@testing-library/user-event";

describe("View Profile Page Test", _ => {
  
  it('Edit Profile Details Page View', async () => {
    await startApp("/profile?token=v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA",  MemoryRouter);
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });

  it('QR Code Tab Page View', async () => {
    await startApp("/profile?token=v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA",  MemoryRouter);
    userEvent.click(screen.getByText("QR Code"));
    expect(screen.getByTestId("current-page")).toMatchSnapshot();

    // Change to White
    userEvent.click(screen.getByText("White"));
    await act(() => new Promise(r => setTimeout(r, 100)));
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });

  it('Update Profile Details', async () => {
    await startApp("/profile?token=v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA",  MemoryRouter);
    // Before Edit
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
    // Edit Fields
    userEvent.type(screen.getByPlaceholderText("Enter your Name"), "Successtar");
    userEvent.type(screen.getByPlaceholderText("Enter Company Name"), "Plumter");
    userEvent.type(screen.getByPlaceholderText("Enter Company Address"), "Lekki");
    userEvent.type(screen.getByPlaceholderText("Enter Position in Company"), "CEO");
    userEvent.type(screen.getByPlaceholderText("Enter website url"), "https://plumter.com");
    expect(screen.getByPlaceholderText("Enter website url")).toBeValid();
    // Input Phone Number
    userEvent.type(screen.getByPlaceholderText("000 - 000 - 0000"), '806 185 568 8',);
    expect(screen.getByPlaceholderText("000 - 000 - 0000")).toBeValid();
    await act(() => new Promise(r => setTimeout(r, 200)));

    // Preview
    userEvent.click(screen.getByText("Preview Profile"));
    await act(() => new Promise(r => setTimeout(r, 200)));

    // Go Back to edit
    userEvent.click(screen.getByText("Close"));
    await act(() => new Promise(r => setTimeout(r, 300)));

    // After Edit
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });

  it('Edit Profile Details Page With Invalid Token', async () => {
    await startApp("/profile?token=v2.local.u_MS6bh88_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA",  MemoryRouter);
    await waitForToastMessage("Invalid token");
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });
});