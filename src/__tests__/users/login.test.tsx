import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import { act } from "react-dom/test-utils";
import Login from "../../pages/login/index";

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("Login component", () => {
  test("handleSubmit is called when the form is submitted and axios call works", async () => {
    // Set mock API URL
    const mockApiUrl = "http://localhost:3000";
    process.env.NEXT_PUBLIC_API_URL = mockApiUrl;

    // Render Login component
    render(<Login />);

    // Input username and password
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    // Test the test inputs were correctly stored
    expect(usernameInput).toHaveValue("username");
    expect(passwordInput).toHaveValue("password");

    // Submit form
    const submitButton = screen.getByTestId("login-submit");
    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(async () => {
      // Check server call was made correctly
      expect(mockAxios.post).toHaveBeenCalledWith(
        `http://localhost:3000/api/login`,
        {
          username: "username",
          password: "password",
        },
        { withCredentials: true }
      );

      // Check server response
      let responseObj = { data: {}, status: 200 };
      mockAxios.mockResponse(responseObj);
    });

    // Check local storage writing
    expect(localStorage.getItem("user")).toBe("username");
  });
});
