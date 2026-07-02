import {
  InstagramIcon, FacebookIcon, LinkedinIcon, XIcon,
  PinterestIcon, TikTokIcon, YoutubeIcon,
} from './PlatformIcons.jsx'

// Central registry for every supported social platform.
// Adding a new platform = adding one entry here. No other app code
// should ever hardcode a platform name, color, or icon.
export const PLATFORMS = {
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    icon: InstagramIcon,
    color: '#E1306C',
    bg: 'rgba(225, 48, 108, 0.12)',
    charLimit: 2200,
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    icon: FacebookIcon,
    color: '#1877F2',
    bg: 'rgba(24, 119, 242, 0.12)',
    charLimit: 63206,
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedinIcon,
    color: '#0A66C2',
    bg: 'rgba(10, 102, 194, 0.12)',
    charLimit: 3000,
  },
  x: {
    id: 'x',
    label: 'X',
    icon: XIcon,
    color: '#0F1419',
    bg: 'rgba(15, 20, 25, 0.10)',
    charLimit: 280,
  },
  pinterest: {
    id: 'pinterest',
    label: 'Pinterest',
    icon: PinterestIcon,
    color: '#E60023',
    bg: 'rgba(230, 0, 35, 0.12)',
    charLimit: 500,
  },
  tiktok: {
    id: 'tiktok',
    label: 'TikTok',
    icon: TikTokIcon,
    color: '#010101',
    bg: 'rgba(16, 185, 129, 0.12)',
    charLimit: 2200,
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    icon: YoutubeIcon,
    color: '#FF0000',
    bg: 'rgba(255, 0, 0, 0.12)',
    charLimit: 5000,
  },
}

export const PLATFORM_LIST = Object.values(PLATFORMS)

export const getPlatform = (id) => PLATFORMS[id] ?? null
