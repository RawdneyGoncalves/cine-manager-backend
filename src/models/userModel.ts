export interface User {
  id: number;
  name: string;
  email: string;
}

export class UserRepository {
  private users: User[] = [];
  private nextId: number = 1;

  createUser(user: User): User {
    const newUser = { ...user, id: this.nextId++ };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  updateUser(id: number, updatedUser: User): User | undefined {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...updatedUser, id };
      return this.users[index];
    }
    return undefined;
  }

  deleteUser(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return this.users.length !== initialLength;
  }
}
