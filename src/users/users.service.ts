import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";
import * as crypto from "crypto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private hash(pw: string) {
    return crypto.createHash("sha256").update(pw).digest("hex");
  }

  async loginUser(email: string, password: string) {
    try {
      // Check if user exists
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST); // 400
      }

      // Compare passwords
      const isPasswordValid = user.password !== this.hash(password);
      if (!isPasswordValid) {
        throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST); // 400
      }

      return {
        statusCode: HttpStatus.OK,
        message: "Login successful",
        user: user,
      };
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }

  async createUser(createUserInput: CreateUserDto) {
    try {
      // Check if user exists
      const user = await this.prisma.user.findFirst({
        where: { email: createUserInput.email },
      });
      if (user) {
        throw new HttpException(
          "User with this email already exists",
          HttpStatus.BAD_REQUEST
        ); // 400
      }

      // Create new user
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserInput,
          password: this.hash(createUserInput.password),
        },
      });

      // Return new user
      return {
        statusCode: HttpStatus.CREATED,
        message: "User created successfully",
        user: newUser,
      };
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }

  async findUserById(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          address: true,
          phone: true,
        },
      });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND); // 404
      }

      return user;
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          address: true,
          phone: true,
        },
      });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND); // 404
      }

      return user;
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }

  async getCurrentUser(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          address: true,
          phone: true,
        },
      });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND); // 404
      }

      return user;
    } catch (error) {
      console.log(error);
      // Rethrow specific errors for clarity
      if (error instanceof HttpException) {
        throw error; // Re-throw the HTTP exceptions to keep their status codes
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        ); // 500
      }
    }
  }
}
