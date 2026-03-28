import { IsAuth } from "../../middlewares/auth.middleware";
import { DashboardModel } from "../../models/dashboard.model";
import { DashboardService } from "./dashboard.service";
import { Query, Resolver, UseMiddleware } from "type-graphql";
import { GqlUser } from "../../graphql/decorators/user.decorator";
import { UserModel } from "../../models/user.model";

@Resolver(() => DashboardModel)
export class DashboardResolver {
    private dashboardService = new DashboardService();

    @Query(() => DashboardModel)
    @UseMiddleware(IsAuth)
    async dashboard(@GqlUser() user: UserModel): Promise<DashboardModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.dashboardService.getDashboardData(user.id);
    }
}
