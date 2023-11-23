import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(5000, () => {
  logger.info("Server running on port 5000");
});
