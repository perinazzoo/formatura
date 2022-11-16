import React from "react";
import { Container } from "../components/container";
import { useLocalStorage } from "../hooks/use-local-storage";

type ListItem = {
  name: string
  group: string
}

type FormState = {
  name: string
  group: string
}

const options = [
  'Família',
  'Família Pai',
  'Família Mãe',
  'Família Gabriel',
  'Família Gui',
  'Amigos',
  'Amigos Pai',
  'Amigos Mãe',
  'Amigos Gabriel',
]

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const groupRef = React.useRef<HTMLSelectElement>(null)
  const [list, setList] = useLocalStorage<ListItem[]>('@formatura/list', [])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = inputRef.current?.value
    const group = groupRef.current?.value
    if (!group || !name) return

    setList([...list, {
      name,
      group
    }])

    inputRef.current.value = ''
    inputRef.current?.focus()
    setTimeout(() => {
      inputRef.current?.scrollIntoView()
    }, 100);
  }

  function removeItem (index: number) {
    setList(list.filter((_, idx) => idx !== index))
  }

  return (
    <Container>
      <div className="flex py-6 gap-8">
        <main className="flex-1 border-r-2 pr-6">
          <h1 className="font-bold text-2xl">Lista</h1>
          <hr className="my-4" />
          <div className="flex gap-3 mb-4">
            <span className="font-bold text-lg w-full max-w-xs">
              Nome
            </span>
            <span className="font-bold text-lg w-full max-w-xs">
              Grupo
            </span>
          </div>
          <hr className="my-4" />
          <ul>
          {list.map(({ name, group }, idx) => (
            <li key={idx} className="mt-2">
              <div className="flex gap-3">
                <span className="w-full max-w-xs">
                  {name}
                </span>
                <span className="w-full max-w-xs">
                  {group}
                </span>
                <button onClick={() => removeItem(idx)} className="px-6 py-2 rounded-md bg-red-500 text-white">
                  x
                </button>
              </div>
            </li>
          ))}
          </ul>
          <form onSubmit={submit} className="flex gap-3 mt-4">
            <div className="w-full max-w-xs">
              <input ref={inputRef} className="w-full px-2 py-3 border-purple-500 border-2 rounded-md" type="text" placeholder="Nome da pessoa" />
            </div>
            <div className="w-full max-w-xs">
              <select defaultValue={options[0]} ref={groupRef}  className="min-h-[52px] w-full px-2 py-3 border-purple-500 border-2 rounded-md">
                <option hidden value=""></option>
                {options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="px-6 py-2 rounded-md bg-purple-500 text-white">
              +
            </button>
          </form>
        </main>
        <aside className="w-full max-w-xs">
          <h1 className="font-bold text-2xl">Totalizador</h1>
          <hr className="my-4" />
          <h1>Número de pessoas: {list.length}</h1>
        </aside>
      </div>
    </Container>
  )
}
