import { redirect } from 'next/navigation';

export default function RedirectHome() {
  redirect('/home');
  return null;
}
