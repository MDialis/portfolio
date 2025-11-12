import { redirect } from 'next/navigation';

export default function Redirect() {
  redirect('/');
  return null;
}
