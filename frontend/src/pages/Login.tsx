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
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MUTATION_LOGIN_USER } from "../graphql/users/mutations";
import { useMutation } from "@apollo/client/react/react.cjs";
import type {
  LoginFormInput,
  LoginUserMutation,
  LoginUserMutationVariables,
} from "../types/user";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const { register, handleSubmit, reset } = useForm<LoginFormInput>();
  const [loading, setLoading] = useState(false);
  const [loginUser] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(MUTATION_LOGIN_USER);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setLoading(true);
    try {
      const { data: result } = await loginUser({
        variables: { loginUserInput: data },
      });
      if (result?.loginUser.statusCode === 200) {
        notifications.show({
          title: "Success",
          message: result?.loginUser.message,
          color: "green",
        });
        login(result?.loginUser.user.id);
        navigate("/");
      } else {
        notifications.show({
          title: "Error",
          message: result?.loginUser.message,
          color: "red",
        });
      }
    } catch {
      notifications.show({
        title: "Error",
        message: "An error occurred",
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
          Please enter your email and password to login.
        </Text>

        <Paper withBorder shadow="sm" p={50} mt={30} radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              {...register("email")}
              label="Email"
              description="Enter your email"
              placeholder="Your Email"
              required
              radius="md"
              disabled={loading}
            />
            <PasswordInput
              {...register("password")}
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              radius="md"
              disabled={loading}
            />
            <Button
              fullWidth
              mt="xl"
              radius="md"
              color="black"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </form>

          <Text mt="xl" size="sm" className="w-2xl">
            Don't have an account?{" "}
            <Link to="/signup">
              <Anchor>Signup</Anchor>
            </Link>
          </Text>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
