import { titleFont } from '@/config/fonts';
import { Register } from './ui/Register';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen sm:pt-52 md:pt-32 fade-in">
      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>New Account</h1>
      <Register />
    </div>
  );
}