"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface WineState {
  name: string
  grape: string
  year: string
  region: string
  producer: string
  [key: string]: string
}

interface ModalProps {
  wineId?: string
}

const initialState: WineState = {
  name: "",
  grape: "",
  year: "",
  region: "",
  producer: ""
}

const inputFields = [
  {
    name: "name",
    label: "Name",
    type: "text"
  },
  {
    name: "grape",
    label: "Grape",
    type: "text"
  },
  {
    name: "region",
    label: "Region",
    type: "text"
  },
  {
    name: "year",
    label: "Year",
    type: "number"
  },
  {
    name: "producer",
    label: "Producer",
    type: "text"
  }
]

export const Modal = ({ wineId }: ModalProps): JSX.Element => {
  const [state, setState] = useState(initialState)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const refreshPage = (): void => {
    router.refresh()
  }

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    const { name, grape, year, region, producer } = state

    if (!name || !grape || !year || !region || !producer) {
      alert("Please provide a value in each input field")
      return
    }

    try {
      const url = wineId
        ? `http://localhost:5000/wine/${wineId}`
        : "http://localhost:5000/wine"
      const method = wineId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      })

      if (response.ok) {
        setShowModal(false)
        refreshPage()
        alert(wineId ? "Wine updated successfully" : "Wine added successfully")
      } else {
        throw new Error(wineId ? "Failed to update wine" : "Failed to add wine")
      }
    } catch (error) {
      console.error(
        wineId ? "Failed to update wine:" : "Failed to add wine:",
        error
      )
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`rounded-sm transition-all text-2xl font-bold tracking-tight text-gray-900 bg-red-300 hover:bg-red-200 ${
          wineId ? "mr-2 " : "p-2"
        }`}
      >
        {wineId ? "Update Wine" : "Add a Wine"}
      </button>

      {showModal && (
        <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="xs:w-5/6 sm:w-2/3 w-1/3 relative w-4/5 w-auto my-6 mx-auto max-w-3xl">
            <div className="bg-gray-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              <div className="bg-gray-300 text-black flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {wineId ? "Update Wine" : "Enter wine values"}
                </h3>
              </div>
              <div className="bg-gray-200 p-6 flex-auto">
                <form
                  onSubmit={handleSubmit}
                  className="bg-gray-200 w-10/12 m-auto"
                >
                  {inputFields.map((field) => (
                    <React.Fragment key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-black"
                      >
                        {field.label}
                      </label>
                      <input
                        className="m-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type={field.type}
                        name={field.name}
                        onChange={handleInputChange}
                        value={state[field.name]}
                      />
                      {state[field.name] === "" && (
                        <p className="pl-3 text-red-700">*</p>
                      )}
                    </React.Fragment>
                  ))}
                  <button
                    type="submit"
                    className="transition-all m-3 text-black bg-red-300 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    {wineId ? "Update Wine" : "Add Wine"}
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
      )}
    </>
  )
}
