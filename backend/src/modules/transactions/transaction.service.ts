import { prisma } from '../../config/prisma';
import { Prisma } from '../../generated/prisma/client';
import { TransactionType } from '../../generated/prisma/enums';
import { PaginatedTransactionModel, TransactionModel } from "../../models/transaction.model";
import { CreateTransactionInput } from "./dto/create-transaction.input";
import { UpdateTransactionInput } from "./dto/update-transaction.input";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 15;
const MAX_PAGE_SIZE = 100;

/** `YYYY-MM` (mês inteiro) ou `YYYY-MM-DD` (dia inteiro), em UTC. */
function parseTransactionPeriod(dateStr: string): { start: Date; end: Date } | null {
    const s = dateStr.trim();
    const dayMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (dayMatch) {
        const y = Number(dayMatch[1]);
        const m = Number(dayMatch[2]);
        const d = Number(dayMatch[3]);
        if (m < 1 || m > 12) return null;
        const start = new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
        if (start.getUTCMonth() !== m - 1 || start.getUTCDate() !== d) return null;
        const end = new Date(Date.UTC(y, m - 1, d, 23, 59, 59, 999));
        return { start, end };
    }
    const monthMatch = /^(\d{4})-(\d{2})$/.exec(s);
    if (monthMatch) {
        const y = Number(monthMatch[1]);
        const month = Number(monthMatch[2]);
        if (month < 1 || month > 12) return null;
        const start = new Date(Date.UTC(y, month - 1, 1, 0, 0, 0, 0));
        const end = new Date(Date.UTC(y, month, 0, 23, 59, 59, 999));
        return { start, end };
    }
    return null;
}

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

    async findByUserId(userId: string, orderBy: string = "desc", safeLimit: number | null = null): Promise<TransactionModel[]> {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { transactionDate: "desc" },
            ...(safeLimit != null && safeLimit > 0 ? { take: safeLimit } : {}),
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

    async countByCategoryId(categoryId: string, userId: string): Promise<number> {
        const count = await prisma.transaction.count({
            where: { categoryId, userId },
        });
        return count;
    }

    /**
     * Lista transações do usuário com paginação.
     * @param page — página 1-based (padrão: 1)
     * @param limit — itens por página (padrão: 15, máx.: 100)
     */
    async paginate(
        userId: string,
        page: number = DEFAULT_PAGE,
        limit: number = DEFAULT_PAGE_SIZE,
        search?: string | null,
        type?: TransactionType | null,
        categoryId?: string | null,
        date?: string | null,
    ): Promise<PaginatedTransactionModel> {
        const safePage = Math.max(1, Math.floor(page));
        const safeLimit = Math.min(Math.max(1, Math.floor(limit)), MAX_PAGE_SIZE);

        const where: Prisma.TransactionWhereInput = { userId };
        if (date != null && date.length > 0) {
            const bounds = parseTransactionPeriod(date);
            if (bounds != null) {
                where.transactionDate = { gte: bounds.start, lte: bounds.end };
            }
        }
        if (search != null && search.trim().length > 0) {
            where.title = { contains: search.trim() };
        }
        if (categoryId != null && categoryId.length > 0) {
            where.categoryId = categoryId;
        }
        if (type != null) {
            where.type = type;
        }

        const [rows, total] = await prisma.$transaction([
            prisma.transaction.findMany({
                where,
                skip: (safePage - 1) * safeLimit,
                take: safeLimit,
                orderBy: { transactionDate: "desc" },
            }),
            prisma.transaction.count({ where }),
        ]);

        return {
            transactions: rows as unknown as TransactionModel[],
            total,
            page: safePage,
            limit: safeLimit,
        };
    }

    async sumAmountByCategoryId(categoryId: string, userId: string): Promise<number> {
        const sum = await prisma.transaction.aggregate({
            where: { categoryId, userId },
            _sum: { amount: true },
        });
        return sum._sum.amount ?? 0;
    }

    async sumAmountByUserId(userId: string, type: TransactionType): Promise<number> {
        const sum = await prisma.transaction.aggregate({
            where: { userId, type: type as TransactionType },
            _sum: { amount: true },
        });
        return sum._sum.amount ?? 0;
    }

    async countByUserId(userId: string): Promise<number> {
        const count = await prisma.transaction.count({
            where: { userId },
        });
        return count;
    }
}
