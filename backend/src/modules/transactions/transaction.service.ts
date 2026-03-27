import { prisma } from '../../config/prisma';
import { TransactionModel } from "../../models/transaction.model";
import { CreateTransactionInput } from "./dto/create-transaction.input";
import { UpdateTransactionInput } from "./dto/update-transaction.input";

export class TransactionService {
    async create(input: CreateTransactionInput, userId: string): Promise<TransactionModel> {
        const transaction = await prisma.transaction.create({
            data: {
                title: input.title,
                description: input.description,
                amount: input.amount,
                type: input.type,
                transactionDate: input.transactionDate,
                user: { connect: { id: userId } },
                category: { connect: { id: input.categoryId } },
            },
        });
        
        return transaction as unknown as TransactionModel;
    }

    async findByUserId(userId: string): Promise<TransactionModel[]> {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
        });
        return transactions as unknown as TransactionModel[];
    }

    async findById(id: string, userId: string): Promise<TransactionModel | null> {
        const transaction = await prisma.transaction.findUnique({
            where: { id, userId },
        });

        if (!transaction) {
            throw new Error("Transaction not found");
        }

        if (transaction.userId !== userId) {
            throw new Error("Transaction not found");
        }

        return transaction as unknown as TransactionModel;
    }

    async findByCategoryId(categoryId: string, userId: string): Promise<TransactionModel[]> {
        const transactions = await prisma.transaction.findMany({
            where: { categoryId, userId },
            orderBy: { transactionDate: "desc" },
        });
        return transactions as unknown as TransactionModel[];
    }

    async update(id: string, userId: string, input: UpdateTransactionInput): Promise<TransactionModel> {
        const transaction = await this.findById(id, userId);
        if (!transaction) {
            throw new Error("Transaction not found");
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id, userId },
            data: input,
        });
        return updatedTransaction as unknown as TransactionModel;
    }

    async delete(id: string, userId: string): Promise<void> {
        const transaction = await this.findById(id, userId);
        if (!transaction) {
            throw new Error("Transaction not found");
        }
        await prisma.transaction.delete({
            where: { id, userId },
        });
        return;
    }
}
