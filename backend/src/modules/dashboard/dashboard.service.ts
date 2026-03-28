import { TransactionService } from "../transactions/transaction.service";
import { DashboardModel } from "../../models/dashboard.model";
import { CategoryService } from "../categories/category.service";
import { TransactionModel } from "../../models/transaction.model";
import { TransactionType } from "../../generated/prisma/enums";

/** Início e fim do mês atual (UTC), alinhado a como as datas costumam ser gravadas. */
function currentMonthRangeUtc(): { start: Date; end: Date } {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    const start = new Date(Date.UTC(y, m, 1, 0, 0, 0, 0));
    const end = new Date(Date.UTC(y, m + 1, 0, 23, 59, 59, 999));
    return { start, end };
}

function asDate(value: Date | string): Date {
    return value instanceof Date ? value : new Date(value);
}

function inMonthRange(d: Date, start: Date, end: Date): boolean {
    const t = d.getTime();
    return t >= start.getTime() && t <= end.getTime();
}

export class DashboardService {
    private transactionService = new TransactionService();
    private categoryService = new CategoryService();

    /** Saldo acumulado: entradas somam, saídas subtraem (valores sempre positivos no banco). */
    private calculateTotalBalance(transactions: TransactionModel[]): number {
        return transactions.reduce((acc, transaction) => {
            if (transaction.type === TransactionType.INCOME) {
                return acc + transaction.amount;
            }

            if (transaction.type === TransactionType.EXPENSE) {
                return acc - transaction.amount;
            }

            return acc;
        }, 0);
    }

    private sumAmountInMonth(
        transactions: TransactionModel[],
        type: (typeof TransactionType)[keyof typeof TransactionType],
        start: Date,
        end: Date,
    ): number {
        return transactions.reduce((sum, tx) => {
            if (tx.type !== type) return sum;
            const d = asDate(tx.transactionDate);
            if (!inMonthRange(d, start, end)) return sum;
            return sum + tx.amount;
        }, 0);
    }

    async getDashboardData(userId: string): Promise<DashboardModel> {
       
        const categories = await this.categoryService.findByUserId(userId, 5);
        const { start, end } = currentMonthRangeUtc();
        const total_balance = await this.transactionService.sumAmountByUserId(userId, TransactionType.INCOME) - await this.transactionService.sumAmountByUserId(userId, TransactionType.EXPENSE);
        const total_income = await this.transactionService.sumAmountByUserId(userId, TransactionType.INCOME);
        const total_expenses = await this.transactionService.sumAmountByUserId(userId, TransactionType.EXPENSE);
        const transactions = await this.transactionService.findByUserId(userId, "desc", 5);

        return {
            total_balance,
            total_income,
            total_expenses,
            transactions,
            categories,
        };
    }
}
