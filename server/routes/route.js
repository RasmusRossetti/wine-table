import express from "express"

import {
  getWines,
  createWine,
  getSingleWine,
  deleteWine,
  updateWine
} from "../controllers/wines.js"

const router = express.Router()
router.get("/wines", getWines)
router.post("/wine", createWine)
router.get("/wine/:id", getSingleWine)
router.delete("/wine/:id", deleteWine)
router.put("/wine/:id", updateWine)

export default router
