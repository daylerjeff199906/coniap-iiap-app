import { IActions, IColumns } from '@/types'

export const columns: Array<IColumns> = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'created_at',
    label: 'Fecha de registro',
    align: 'start',
  },
  {
    key: 'title',
    label: 'Tema | Título',
    align: 'start',
  },
  {
    key: 'topic',
    label: 'Línea de investigación',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Nombre',
    align: 'start',
  },
  {
    key: 'surname',
    label: 'Apellidos',
    align: 'start',
  },
  {
    key: 'email',
    label: 'Email',
    align: 'start',
  },
  {
    key: 'phone',
    label: 'Teléfono',
    align: 'start',
  },
  {
    key: 'institution',
    label: 'Institución',
    align: 'start',
  },
  {
    key: 'coauthors',
    label: 'Coautores',
    align: 'start',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },
  {
    key: 'isAprroved',
    label: 'Aprobado',
    align: 'center',
  },
]

export const actions: Array<IActions> = [
  {
    label: 'Cambiar estado',
    key: 'status',
    href: 'status',
  },
]
