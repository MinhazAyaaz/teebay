import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  fineOnewithId(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async validateUser(email: string, password: string) {
    try {
      // Check if user exists
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST); // 400
      }

      // Compare passwords
      const isPasswordValid = password === user.password;
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

  async signUp(createUserInput: CreateUserDto) {
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
        data: createUserInput,
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
}
