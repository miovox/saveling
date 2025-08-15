import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FamilyRegistrationForm } from './FamilyRegistrationForm';

describe('FamilyRegistrationForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields', () => {
    render(<FamilyRegistrationForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/family handle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(<FamilyRegistrationForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/family handle/i), 'test-family');
    await user.type(screen.getByLabelText(/display name/i), 'Test Family');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');

    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        handle: 'test-family',
        displayName: 'Test Family',
        password: 'password123',
      });
    });
  });

  it('should show validation errors for invalid input', async () => {
    const user = userEvent.setup();

    render(<FamilyRegistrationForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/family handle/i), 'ab'); // Too short
    await user.type(screen.getByLabelText(/^password$/i), '123'); // Too short
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/handle must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show error for mismatched passwords', async () => {
    const user = userEvent.setup();

    render(<FamilyRegistrationForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/family handle/i), 'test-family');
    await user.type(screen.getByLabelText(/display name/i), 'Test Family');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'different123');

    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should display error message when provided', () => {
    render(
      <FamilyRegistrationForm 
        onSubmit={mockOnSubmit} 
        error="Registration failed" 
      />
    );

    expect(screen.getByText('Registration failed')).toBeInTheDocument();
  });

  it('should disable button when loading', () => {
    render(
      <FamilyRegistrationForm 
        onSubmit={mockOnSubmit} 
        isLoading={true} 
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Creating Account...');
  });
});