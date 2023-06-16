import { v4 as uuid } from "uuid"

let wines = []

export const getWines = (req, res) => {
  res.send(wines)
}

export const createWine = (req, res) => {
  const wine = req.body
  wines.push({ ...wine, id: uuid() })
  res.send("Wine Added Successfully")
}

export const getSingleWine = (req, res) => {
  const singleWine = wines.filter((wine) => wine.id === req.params.id)
  res.send(singleWine)
}
export const deleteWine = (req, res) => {
  wines = wines.filter((wine) => wine.id !== req.params.id)
  res.send("Wine Deleted Successfully")
}

export const updateWine = (req, res) => {
  const wine = wines.find((wine) => wine.id === req.params.id)

  wine.name = req.body.name
  wine.grapes = req.body.grape
  wine.year = req.body.year
  wine.region = req.body.region
  wine.producer = req.body.producer

  res.send("Wine Updated Successfully")
}
