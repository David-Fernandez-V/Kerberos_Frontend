//Niveles de fuerza
export const strengthLabels: string[] = ["Muy Debil", "Debil", "Estandar", "Fuerte", "Muy Fuerte"]
export const strengthColors = ["red.700", "orange.600", "yellow.500", "green.500", "teal.700"];

//Meses
export const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
];

//Usuario
export type User = {
  email: string
  name: string
}

//Carpeta
export type FolderItem = {
  id: number
  name: string
}

//Contraseñas
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

//Notas
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

//Tarjetas
export type CardItem = {
  id: number
  alias: string
  last4: string
  brand: string
  type: string
  ask_password: boolean
  folder: FolderItem | null
}

export type CardDetailItem = {
  cardholder_name: string
  number: string
  expiration_month: string
  expiration_year: string
  csv: string
  notes: string
  created_at: string
  updated_at: string
}

//Generador de contraseñas

export type PasswordConfig = {
  length: number;
  include_capital: boolean;
  include_lower: boolean;
  include_number: boolean;
  include_symbols: boolean;
};

export type PassphraseConfig = {
  words_number: number;
  separator: string;
  include_number: boolean;
  include_symbol: boolean;
  capitalize: boolean;
  english: boolean;
  spanish: boolean;
};