import { Router } from "express";
const router = Router();

router.get('/', function (req, res, next) {
    res.json({ message: 'Hello World!' });
  });

export default router;