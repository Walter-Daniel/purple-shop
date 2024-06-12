import { titleFont } from '@/config/fonts'

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
        <p>
            <span className={`${titleFont.className} font-bold antialiased`}>Purple </span>
            <span>| shop </span>
            <span>© { new Date().getFullYear() }</span>
        </p>
    </div>
  )
}
