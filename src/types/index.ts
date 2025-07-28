
export const strengthLabels: string[] = ["Muy Debil", "Debil", "Estandar", "Fuerte", "Muy Fuerte"]
export const strengthColors = ["red.700", "orange.600", "yellow.500", "green.500", "teal.700"];

export type FolderItem = {
  id: number
  name: string
}

export type PasswordItem = {
  id: number
  service_name: string
  strength_level: number
  web_page: string
  ask_password: boolean
  folder?: FolderItem | null
}

export type PasswordDetailItem = {
  password: string
  username: string
  created_at: string
  updated_at: string
  notes: string
}

export type NoteItem = {
  id: number
  title: string
  created_at: string
  updated_at: string
  ask_password: boolean
  folder?: FolderItem | null
}

export type NoteDetailItem = {
  content: string
}

