import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import User from '.';

test('displays loading text while fetching user data', async () => {
  renderWithProviders(<User />);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('displays users after finished fetching data', async () => {
  renderWithProviders(<User />);

  await waitFor(() => {
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('1-770-736-8031 x56442')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();

    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    expect(screen.getByText('Clementine Bauch')).toBeInTheDocument();
  });
});

test('deletes user and displays updated users list', async () => {
  renderWithProviders(<User />);

  await waitFor(() => {
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByRole('button')[2]);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();

    expect(screen.queryByText('Clementine Bauch')).not.toBeInTheDocument();
  });
});
