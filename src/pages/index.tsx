import { Button, Input, Option, Select } from "@material-tailwind/react";
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
  const [list, setList] = useLocalStorage<ListItem[]>('@formatura/list', [])
  const [formState, setFormState] = React.useState<FormState>({
    group: '',
    name: ''
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('adsad')
    if (!formState.group || !formState.name) return


    setList([...list, {
      name: formState.name,
      group: formState.group
    }])
  }

  function onChange (name: keyof FormState, value: string) {
    setFormState(oldState => ({
      ...oldState,
      [name]: value
    }))
  }

  return (
    <Container>
      <div className="flex py-6 gap-8">
        <main className="flex-1 border-r-2 pr-6">
          <h1 className="font-bold text-2xl">Lista</h1>
          <hr className="my-4" />
          <ul>
          {list.map(({ name, group }) => (
            <li key={name}>
              <div className="flex gap-3">
                <span className="w-full max-w-xs">
                  {name}
                </span>
                <span className="w-full max-w-xs">
                  {group}
                </span>
              </div>
            </li>
          ))}
          </ul>
          <form onSubmit={submit} className="flex gap-3 mt-4">
            <div className="w-full max-w-xs">
              <Input onChange={(e) => onChange('name', e.target.value)} label="Nome da pessoa" />
            </div>
            <div className="w-full max-w-xs">
              <Select onChange={(val) => onChange('group', val as string)} label="Grupo">
                {options.map(opt => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            </div>
            <Button type="submit">
              +
            </Button>
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
