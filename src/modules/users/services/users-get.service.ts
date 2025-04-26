import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersGetService {
  // GET ALL USERS
  getAllUsers() {
    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
  }
}
