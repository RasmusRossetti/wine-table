import { url } from "@/assets/image"
import { Button } from "@/components/deletebutton/Button"
import { Header } from "@/components/header/Header"
import { Modal } from "@/components/modal/Modal"
import { Wine } from "@/models/Wine"
import Image from "next/image"
import { Suspense } from "react"

async function getWines(): Promise<any[]> {
  "use client"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error("API URL is not defined")
  }

  const res = await fetch(apiUrl, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default async function Home(): Promise<JSX.Element> {
  const WinesData = await getWines()

  return (
    <main className="text-white font-mono ">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between w-full items-center mb-9">
              <h2 className="text-5xl font-bold tracking-tight text-gray-900">
                Our Wines
              </h2>
              <Modal />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Availability to add and update wines
            </h2>
            <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {WinesData?.map((wine: Wine) => (
                <>
                  <div key={wine.name} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80">
                      <Image
                        src={url}
                        alt={wine.name}
                        width={800}
                        height={500}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {wine.producer}
                          </div>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {wine.region}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 font-medium">
                          {wine.name}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {wine.year}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <Modal wineId={wine.id} />
                      </div>
                      <div className="relative">
                        <Button wineId={wine.id} />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  )
}
