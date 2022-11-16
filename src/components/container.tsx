import { PropsWithChildren } from "react"


export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="xl:container mx-auto px-4">
      {children}
    </div>
  )
}