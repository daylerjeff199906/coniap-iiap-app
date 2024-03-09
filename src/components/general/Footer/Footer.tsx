import { Divider } from '@nextui-org/react'
import Image from 'next/image'

export const Footer = () => {
  return (
    <>
      <footer className="bg-slate-900 p-4 lg:p-8 space-y-4">
        <section></section>
        <section className="grid grid-cols-4 gap-6">
          <div className="space-y-4">
            <Image
              src="/logo_coniap.webp"
              alt="logo"
              width={160}
              height={100}
            />
            <p className="text-white text-tiny">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet.
            </p>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </section>
        <Divider className="bg-white" />
        <section>
          <p className="text-white text-tiny text-center">
            © {new Date().getFullYear()} All rights reserved. | Congreso
            Inernacional de la Amazónia Peruana
          </p>
        </section>
      </footer>
    </>
  )
}
