//
'use client'
import Image from 'next/image';
import Form, { Span } from 'cp/form';
import { useRouter } from 'next/navigation';
import Session from 'sv/session'
import type UserModel from '../../../../../cross_techcellxpress/models/user_model.js'
import 'st/register.css'

export default function Register() {
  const router = useRouter();

  type _Register = { confirmPassword: string } & UserModel;

  async function handlerService(register: _Register) {
    const { error, data } = await Session.register(register)

    if (error) {
      //notify
      alert("error login: " + error)
      return;
    }

    router.push('/login');
  }

  return (
    <div className="container-register">
      <header>
        <Image src="/logo.webp" priority width="300" height="300" alt="img logo" />
      </header>
      <main>
        <div className="container-form">
          <Form<_Register> onService={handlerService} textBtn="Check in">
            <label>Name
              <input id="name" name="name" placeholder="Juan Carlos" />
              <Span
                htmlFor="name"
                required="Se requiere este campo. *"
                minlength={[4, "Su usurio debe tener almenos 4 caracteres"]} />
            </label>
            <label >LastName
              <input id="lastName" name="lastName" placeholder="San" />
              <Span
                htmlFor="lastName"
                required="Se requiere este campo. *"
                minlength={[4, "Su usurio debe tener almenos 4 caracteres"]} />
            </label>
            <label >Email
              <input type="email" name="email" placeholder="Ejemplo@emil.com" />
            </label>
            <label >User
              <input id="user" type="text" name="user" placeholder="Juan316" />
              <Span
                htmlFor="user"
                required="Se requiere este campo. *"
                minlength={[4, "Su usurio debe tener almenos 4 caracteres"]} />
            </label>
            <label >Password
              <input id="password" type="password" name="password" placeholder="**********" />
              <Span
                htmlFor="password"
                required="Se requiere este campo. *"
                minlength={[8, "Su usurio debe tener almenos 8 caracteres"]} />
            </label>
            <label >Confirm Password
              <input id="password" type="password" name="confirmPassword" placeholder="**********" />
              <Span
                htmlFor="password"
                required="Se requiere este campo. *"
                minlength={[8, "Su usurio debe tener almenos 8 caracteres"]} />
            </label>
          </Form>

          <button onClick={() => router.push('/login')}>
            <i>
              login
            </i>
          </button>
        </div>
      </main>
    </div>
  )
}
