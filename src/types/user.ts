export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
};

export type SignUpFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type CreateUserDto = Omit<SignUpFormInput, 'confirmPassword'>;

export type CreateUserMutation = {
  createUser: {
    statusCode: number;
    message: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      address: string;
      phone: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type CreateUserMutationVariables = {
  createUserInput: CreateUserDto;
};

export type LoginFormInput = {
  email: string;
  password: string;
};
