import { redirect } from 'next/navigation';

export default function RootNotFound() {
    return redirect('/es'); // Redirige por defecto a la locale 'es'
}
