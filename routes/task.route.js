import { Router } from "express";
const router = Router();

import {
  task_create,
  task_details,
  tasks_update,
  task_delete,
  get_all_tasks,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middleware/auth.js";

router.use(verifyToken);

router.get("/check", (req, res) => {
  res.sendStatus(200);
});
// a simple test url to check that all of our files are communicating correctly.
// router.get('/test', test);
router.post("/create", task_create);
router.get("/:id", task_details);
router.put("/:id/update", tasks_update);
router.delete("/:id/delete", task_delete);
router.get("/all_tasks_by_id/:login_id", get_all_tasks);

export default router;
