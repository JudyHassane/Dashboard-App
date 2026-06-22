import { AppDataSource } from "../orm/config/ormconfig";
import { ActivityLog } from "../orm/entities/activity-logs/activity-log.entity";
import { ActivityAction } from "../orm/entities/activity-logs/enums";

type LogActivityParams = {
  action: ActivityAction;
  message: string;
  entityId?: number;
  userId?: number;
};

export const logActivity = async ({
  action,
  message,
  entityId,
  userId,
}: LogActivityParams) => {
  const activityLogRepository = AppDataSource.getRepository(ActivityLog);

  const log = activityLogRepository.create({
    action,
    message,
    entityId,
    user: userId ? { id: userId } : undefined,
  });

  await activityLogRepository.save(log);
};
