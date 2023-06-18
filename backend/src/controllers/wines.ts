import { v4 as uuid } from "uuid"
import { Request, Response } from "express"
import { Wine } from "../model/Wine"

let wines: Wine[] = []

export const getWines = (req: Request, res: Response) => {
  res.send(wines)
}

export const createWine = (req: Request, res: Response) => {
  const wine = req.body
  wines.push({ ...wine, id: uuid() })
  res.send("Wine Added Successfully")
}

export const getSingleWine = (req: Request, res: Response) => {
  const singleWine = wines.filter((wine) => wine.id === req.params.id)
  res.send(singleWine)
}
export const deleteWine = (req: Request, res: Response) => {
  wines = wines.filter((wine) => wine.id !== req.params.id)
  res.send("Wine Deleted Successfully")
}

export const updateWine = (req: Request, res: Response) => {
  const wine = wines.find((wine) => wine.id === req.params.id)

  wine.name = req.body.name
  wine.grape = req.body.grape
  wine.year = req.body.year
  wine.region = req.body.region
  wine.producer = req.body.producer

  res.send("Wine Updated Successfully")
}
