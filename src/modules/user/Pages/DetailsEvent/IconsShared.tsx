'use client'
import { ShareIcons } from '@/modules/core'

export const IconsShared = () => {
  return (
    <section
      id="share"
      className="flex flex-row gap-4 justify-start sm:items-center"
    >
      <div>
        <h3 className="tex-sm font-bold">Compartir por:</h3>
      </div>
      <ShareIcons social="facebook" />
      <ShareIcons social="whatsapp" />
      <ShareIcons social="linkedin" />
      <ShareIcons social="instagram" />
      <ShareIcons
        social="x"
        size="xs"
      />
    </section>
  )
}
