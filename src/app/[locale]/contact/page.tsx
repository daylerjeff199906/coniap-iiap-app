import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `${t('contact.title') || 'Contacto'} | CONIAP`,
        description: t('contact.description') || 'Ponte en contacto con nosotros.',
    }
}

export default async function ContactPage() {
    return (
        <main className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                                Ponte en <span className="text-primary tracking-widest italic">Contacto</span>
                            </h1>
                            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-md">
                                Estamos aquí para responder tus preguntas sobre el congreso y la Amazonía Peruana.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                    <Mail size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Email</p>
                                    <p className="text-xl font-bold text-white">coniap@iiap.gob.pe</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                    <Phone size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Teléfono</p>
                                    <p className="text-xl font-bold text-white">+51 065 265515</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                    <MapPin size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Ubicación</p>
                                    <p className="text-xl font-bold text-white max-w-xs">Av. José A. Quiñones km. 2.5, Iquitos, Perú</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-[3rem] p-10 md:p-16 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />

                        <form className="space-y-8 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-zinc-800 py-4 focus:outline-none focus:border-primary transition-all text-white font-bold"
                                    placeholder="TU NOMBRE"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-zinc-800 py-4 focus:outline-none focus:border-primary transition-all text-white font-bold"
                                    placeholder="EMAIL@EJEMPLO.COM"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-1">Mensaje</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-transparent border-b border-zinc-800 py-4 focus:outline-none focus:border-primary transition-all text-white font-bold resize-none"
                                    placeholder="¿EN QUÉ PODEMOS AYUDARTE?"
                                />
                            </div>

                            <button className="w-full bg-primary text-black font-black uppercase tracking-[0.2em] py-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group">
                                Enviar Mensaje
                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
