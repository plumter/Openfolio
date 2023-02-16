import "__test__/Integration/common/server";
import {screen, act} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { startApp, waitForToastMessage } from "__test__/Integration/common/base";

describe("View Profile Page Test", _ => {

  it('Public Profile Page View', async () => {
    await startApp("/63eb743cbf03b80915f4ad88",  MemoryRouter);
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });

  it('Profile Page Preview', async () => {
    await startApp("/63eb743cbf03b80915f4ad88?token=v2.local.YFtzW3EBVnesd9DluHg99ZBOezgbSU25v6U2RKjs_jQxnmOS7QFyBQcjqFQtX4kQqX5fD3nJjIv7W97Pe_aSWYZmyxDm4NiC_N-q1S-VPR_0_BHnxtp34mI7Vy2cZW8AYQZjqLQj-pm5u9gSANY8mxKdG6-PuFsKEJKh2_wTZVdxetJ3z8ZDewG9sic7oxgeHoeLfqFKienJsvTM_fI4-j_EBekZDds1t9PN9mOVlldsJqX6YYJ9OE8aIrt2A5ocWKB5yMdRcFozUUBxmyHboMc.bnVsbA",  MemoryRouter);
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });

  it('Invalid Public Profile Page View', async () => {
    await startApp("/63eb743cbf03b80915f4ad89",  MemoryRouter);
    await waitForToastMessage("User does not exist");
    expect(screen.getByTestId("current-page")).toMatchSnapshot();
  });
});