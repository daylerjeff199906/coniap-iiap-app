'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const socialMedia = {
  facebook: {
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
    icon: 'facebook',
    name: 'Facebook',
  },
  whatsapp: {
    url: 'https://api.whatsapp.com/send?text=',
    icon: 'whatsApp',
    name: 'WhatsApp',
  },
  linkedin: {
    url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    icon: 'linkedin',
    name: 'LinkedIn',
  },
  x: {
    url: 'https://twitter.com/intent/tweet?url=',
    icon: 'x',
    name: 'Twitter',
  },
  instagram: {
    url: 'https://www.instagram.com/',
    icon: 'instagram',
    name: 'Instagram',
  },
}

interface IProps {
  social: 'facebook' | 'whatsapp' | 'linkedin' | 'x' | 'instagram'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const ShareIcons = (props: IProps) => {
  const { social } = props
  const pathname = usePathname()

  const size = {
    xs: 16,
    sm: 24,
    md: 28,
    lg: 32,
  }

  const sizeSelected = size[props.size || 'md']
  const socialSelected = socialMedia[social]

  return (
    <div id="share-media">
      <Link
        href={`${socialSelected.url}https://coniap.iiap.gob.pe${pathname}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-80"
      >
        <Image
          src={`/social-network/${socialSelected.icon}.svg`}
          alt={socialSelected.name}
          width={sizeSelected}
          height={sizeSelected}
        />
      </Link>
    </div>
  )
}
