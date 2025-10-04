import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
    <Container fluid w={500} className="p-10 rounded-lg">
      <Title ta="center">
        Sazim Test App
      </Title>

      <Text ta="center" mt={10} size="sm">
        Please enter your email and password to login.
      </Text>

      <Paper withBorder shadow="sm" p={50} mt={30} radius="md">
        <TextInput
          label="Email"
          description="Enter your email"
          placeholder="Your Email"
          required
          radius="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
        />
        <Checkbox label="Remember me" mt="md"/>
        <Button fullWidth mt="xl" radius="md" color="black">
            Login
        </Button>

        <Text mt="xl" size="sm" className="w-2xl">
          Don't have an account? <Link to="/signup"><Anchor>Signup</Anchor></Link>
          </Text>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
