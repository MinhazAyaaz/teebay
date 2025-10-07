import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type SignUpFormInput,
  type CreateUserMutation,
  type CreateUserMutationVariables,
} from "../types/user";
import { useMutation } from "@apollo/client/react";
import { MUTATION_CREATE_USER } from "../graphql/users/mutations";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm<SignUpFormInput>();
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(MUTATION_CREATE_USER);
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    setLoading(true);
    const { confirmPassword, ...rest } = data; // remove field not in backend DTO
    if (confirmPassword !== data.password) {
      notifications.show({
        title: "Error",
        message: "Passwords do not match",
        color: "red",
      });
      return;
    }
    try {
      const { data: result } = await createUser({
        variables: { createUserInput: rest },
      });
      if (result?.createUser.statusCode === 201) {
        notifications.show({
          title: "Success",
          message: result?.createUser.message,
          color: "green",
        });
        login(result?.createUser.user.id);
        navigate("/");
      } else {
        notifications.show({
          title: "Error",
          message: result?.createUser.message,
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "An error occurred",
        color: "red",
      });
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Container fluid w={500} className="p-10 rounded-lg">
        <Title
          ta="center"
          className="text-2xl font-bold font-mono text-gray-700"
        >
          TEEBAY
        </Title>

        <Text ta="center" mt={10} size="sm">
          Please enter details to signup.
        </Text>

        <Paper
          withBorder
          shadow="sm"
          p={50}
          mt={30}
          radius="md"
          className="flex flex-col gap-4"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row gap-4">
              {" "}
              {/* flex-row on desktop, flex-col on mobile */}
              <TextInput
                label="First Name"
                placeholder="Your First Name"
                required
                radius="md"
                {...register("firstName")}
                disabled={loading}
              />
              <TextInput
                label="Last Name"
                placeholder="Your Last Name"
                required
                radius="md"
                {...register("lastName")}
                disabled={loading}
              />
            </div>
            <TextInput
              label="Email"
              description="Enter your email"
              placeholder="Your Email"
              required
              mt="md"
              mb="md"
              radius="md"
              {...register("email")}
              disabled={loading}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              {" "}
              {/* flex-row on desktop, flex-col on mobile */}
              <TextInput
                label="Address"
                placeholder="Your Address"
                required
                radius="md"
                {...register("address")}
                disabled={loading}
              />
              <TextInput
                label="Phone"
                placeholder="Your Phone"
                required
                radius="md"
                {...register("phone")}
                disabled={loading}
              />
            </div>
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              radius="md"
              {...register("password")}
              disabled={loading}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Your confirm password"
              required
              mt="md"
              radius="md"
              {...register("confirmPassword")}
              disabled={loading}
            />
            <Button
              fullWidth
              mt="xl"
              radius="md"
              color="black"
              type="submit"
              loading={loading}
            >
              Create Account
            </Button>

            <Text mt="xl" size="sm" className="w-2xl">
              Already have an account?{" "}
              <Link to="/login">
                <Anchor>Login</Anchor>
              </Link>
            </Text>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
