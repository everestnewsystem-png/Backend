import cron from "cron";
import Task from "../models/Task.js";

// Nepal Time (UTC +5:45)
const NEPAL_TIMEZONE = "Asia/Kathmandu";

/**
 * Auto-delete completed tasks daily at 23:59 Nepal time
 */
const job = new cron.CronJob(
  "59 23 * * *", // 23:59 daily
  async () => {
    try {
      const deleted = await Task.deleteMany({ isCompleted: true });

      console.log(
        `🧹 Daily Cleanup: Removed ${deleted.deletedCount} completed tasks`
      );
    } catch (error) {
      console.error("❌ Error cleaning tasks:", error);
    }
  },
  null,
  true,
  NEPAL_TIMEZONE
);

job.start();

export default job;
