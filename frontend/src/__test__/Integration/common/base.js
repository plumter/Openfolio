import '@testing-library/jest-dom'
import { act, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'app/App';

// Mock App Start Up
export const startApp = async (url = "/", Router = MemoryRouter) => {
    render( <Router initialEntries={[url]} >
                <App />
            </Router>);
    
    await act(() => new Promise(r => setTimeout(r, 100)));
}

window.testToast =  jest.fn();


let calls;
beforeEach(() => calls = 1);

export const waitForToastMessage = async mess => {
    await act(() => new Promise(r => setTimeout(r, 100)));
    await waitFor(() => expect(testToast).toHaveBeenCalledTimes(calls));
    expect(testToast.mock.calls[(calls - 1)][0]).toBe(mess);
    calls++
}