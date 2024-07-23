import { IColumns } from '@/types'

export const columns: IColumns[] = [
  {
    key: 'num',
    label: '#',
    align: 'start',
  },
  {
    key: 'created_at',
    label: 'F. Creación',
    align: 'start',
  },
  {
    key: 'userName',
    label: 'User Name',
    align: 'start',
  },
  {
    key: 'email',
    label: 'Email',
    align: 'start',
  },
  {
    key: 'person',
    label: 'Persona',
    align: 'start',
  },
  {
    key: 'emailVerified',
    label: 'Email Verificado',
    align: 'center',
  },
  {
    key: 'role',
    label: 'Roles',
    align: 'start',
  },
  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]
