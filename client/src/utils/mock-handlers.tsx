import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

const mockUsers = [
  {
    _id: '66f5fe426cf9d1d0f953d36e',
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    __v: 0,
  },
  {
    _id: '66f5fe426cf9d1d0f953d370',
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    __v: 0,
  },
  {
    _id: '66f5fe426cf9d1d0f953d372',
    name: 'Clementine Bauch',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    __v: 0,
  },
];

export const handlers = [
  http.get('/api/user', async () => {
    await delay(150);
    return HttpResponse.json(mockUsers);
  }),

  http.delete('/api/user', async () => {
    await delay(150);
    return HttpResponse.json({
      message: 'User has been deleted!',
      user: {
        _id: '66f5fe426cf9d1d0f953d372',
        name: 'Clementine Bauch',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        __v: 0,
      },
    });
  }),
];

export const server = setupServer(...handlers);
