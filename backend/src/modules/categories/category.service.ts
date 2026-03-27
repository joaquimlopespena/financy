import { prisma } from '../../config/prisma';
import { CategoryModel } from "../../models/category.model";
import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { TransactionModel } from "../../models/transaction.model";

export class CategoryService {
    async create(input: CreateCategoryInput, userId: String): Promise<CategoryModel> {
        const category = await prisma.category.create({
            data: {
                ...input,
                user: { connect: { id: userId as string } },
            },
        });
        return category as unknown as CategoryModel;    
    }

    async findByUserId(userId: string): Promise<CategoryModel[]> {
        const categories = await prisma.category.findMany({
            where: { userId },
        });
        return categories as unknown as CategoryModel[];
    }

    async findById(id: string, userId: string): Promise<CategoryModel | null> {
        const category = await prisma.category.findUnique({
            where: { id, userId },
        });

        if (!category) {
            throw new Error("Category not found");
        }

        if (category.userId !== userId) {
            throw new Error("Category not found");
        }

        return category as unknown as CategoryModel;
    }   

    async update(id: string, userId: string, input: UpdateCategoryInput): Promise<CategoryModel> {
        const category = await this.findById(id, userId);
        if (!category) {
            throw new Error("Category not found");
        }

        const updatedCategory = await prisma.category.update({
            where: { id, userId },
            data: input,
        });
        return updatedCategory as unknown as CategoryModel;
    }

    async delete(id: string, userId: string): Promise<void> {
        const category = await this.findById(id, userId);
        if (!category) {
            throw new Error("Category not found");
        }
        await prisma.category.delete({
            where: { id, userId },
        });
        return;
    }

    async findTransactionsById(id: string, userId: string): Promise<TransactionModel[]> {
        const category = await this.findById(id, userId);
        if (!category) {
            throw new Error("Category not found");
        }
        return category.transactions as unknown as TransactionModel[];
    }
}
