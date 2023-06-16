"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const initialState = {
  name: "",
  grape: "",
  year: "",
  region: "",
  producer: ""
}

export const Modal = () => {
  const [state, setState] = useState(initialState)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const refreshPage = () => {
    router.refresh()
  }

  const addWine = async () => {
    const { name, grape, year, region, producer } = state

    if (!name || !grape || !year || !region || !producer) {
      alert("Please provide a value in each input field")
      setErrorMessage("*")
      return
    } else {
      try {
        const response = await fetch("http://localhost:5000/wine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(state)
        })

        if (response.ok) {
          setShowModal(false)
          setErrorMessage("")
          refreshPage()
          alert("Wine added successfully")
        } else {
          throw new Error("Failed to add wine")
        }
      } catch (error) {
        console.error("Failed to add wine:", error)
      }
    }
  }

  const { name, grape, year, region, producer } = state

  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addWine()
  }
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="transition-all text-2xl font-bold tracking-tight text-gray-900 bg-red-300 hover:bg-red-200 p-2 "
      >
        Add a Wine
      </button>
      {showModal ? (
        <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="xs:w-5/6 sm:w-2/3 w-1/3  relative w-4/5 w-auto my-6 mx-auto max-w-3xl">
            <div className=" bg-gray-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              <div className="bg-gray-300 text-black flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl  font-semibold">Enter wine values</h3>
              </div>

              <div className="bg-gray-200  p-6 flex-auto">
                <form
                  onSubmit={handleSubmit}
                  className="bg-gray-200 w-10/12 m-auto"
                >
                  <label
                    htmlFor="name"
                    className=" text-sm font-medium text-black"
                  >
                    Name
                  </label>
                  <input
                    className="m-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleInputChange}
                    value={name}
                  />

                  <p className="pl-3 text-red-700">{errorMessage}</p>
                  <label
                    htmlFor="grape"
                    className="  text-sm font-medium text-black "
                  >
                    Grape
                  </label>
                  <input
                    className="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    type="text"
                    name="grape"
                    onChange={handleInputChange}
                    value={grape}
                  />
                  <p className="pl-3 text-red-700">{errorMessage}</p>
                  <label
                    htmlFor="region"
                    className=" text-sm font-medium text-black"
                  >
                    Region
                  </label>
                  <input
                    className="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    name="region"
                    onChange={handleInputChange}
                    value={region}
                  />
                  <p className="pl-3 text-red-700">{errorMessage}</p>
                  <label
                    htmlFor="year"
                    className=" text-sm font-medium text-black"
                  >
                    Year
                  </label>
                  <input
                    className="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    name="year"
                    onChange={handleInputChange}
                    value={year}
                  />
                  <p className="pl-3 text-red-700">{errorMessage}</p>
                  <label
                    htmlFor="producer"
                    className=" text-sm font-medium text-black"
                  >
                    Producer
                  </label>
                  <input
                    className="m-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    name="producer"
                    onChange={handleInputChange}
                    value={producer}
                  />
                  <p className=" pl-3 text-red-700">{errorMessage}</p>
                  <button
                    type="submit"
                    className="transition-all m-3 text-black bg-red-300 hover:bg-red-200 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    Add Wine
                  </button>
                </form>
              </div>
              <div className="bg-gray-200 flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 hover:text-red-300 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
