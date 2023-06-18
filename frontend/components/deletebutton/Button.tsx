"use client"
import { useRouter } from "next/navigation"
interface Props {
  wineId: string
}

export const Button = ({ wineId }: Props): JSX.Element => {
  const router = useRouter()
  const refreshPage = (): void => {
    router.refresh()
  }

  const handleDelete = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/wine/${wineId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        alert("Wine deleted successfully")
        refreshPage()
      } else {
        throw new Error("Failed to delete wine")
      }
    } catch (error) {
      console.error("Failed to delete wine:", error)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-sm transition-all text-2xl font-bold tracking-tight text-gray-900 bg-red-400 hover:bg-red-200 ml-2"
    >
      Delete Wine
    </button>
  )
}
