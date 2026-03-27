import { prisma } from "../../config/prisma";
import { hashPassword } from "../../shared/utils/hash";
import { PrismaClient } from "../../generated/prisma/client";
import { UserModel } from "../../models/user.model";
import { CreateUserInput, UpdateUserInput } from "./dto/create-user.input";

export class UserService {

    constructor(private readonly prisma: PrismaClient) {}

    async create(input: CreateUserInput): Promise<UserModel> {

        const existingUser = await this.findByEmail(input.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(input.password);

        const user = await this.prisma.user.create({
            data: {
                ...input,
                password: hashedPassword,
            },
        });

        return user;
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }

    async findById(id: string): Promise<UserModel | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }

    async update(id: string, input: UpdateUserInput): Promise<UserModel> {
        const existingUser = await this.findById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }

        if (input.password) {
            input.password = await hashPassword(input.password);
        }

        return this.prisma.user.update({
            where: { id },
            data: input,
        });
    }
}

export const userService = new UserService(prisma);
