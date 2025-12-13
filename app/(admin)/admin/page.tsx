import { cookies } from 'next/headers'
import SignIn from './component/loginClientPage'
import { redirect } from 'next/navigation';

const page =async () => {

  const cookieStore=await cookies();
  const adminToken=cookieStore.get('admin-token')?.value
 
  if(adminToken){
    redirect('/admin/dashboard')
  }
  return (
    <SignIn/>
  )
}

export default page