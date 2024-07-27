//
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useStore from 'str/store';
import Form, { Span } from 'cp/form';
import Session from 'sv/session'
import 'st/login.css'

export default function Login() {
  const { login } = useStore((state) => ({ login: state.login }));
  const router = useRouter();

  type Credentials = {
    user: string,
    password: string,
  }

  async function handlerService(credentials: Credentials) {
    const { error, data } = await Session.logIn(credentials);
    if (error) {
      //notify
      alert("error login: " + error)
      return;
    }

    login(data)
    router.push('/dashboard');
  }

  return (
    <div className="container-login">
      <header>
        <Image src="/logo.webp" priority width="300" height="300" alt="img logo" />
      </header>
      <main>
        <div className="container-form">
          <Form<Credentials> onService={handlerService} textBtn="Access">
            <label >User
              <input id="user" name="user" placeholder="Juan316" />
              <Span
                htmlFor="user"
                required="This field is required."
                minlength={[4, "This field must be at least 4 characters."]} />
            </label>
            <label >Password
              <input id="password" name="password" placeholder="*****" type="password" />
              <Span
                htmlFor="password"
                required="This field is required."
                minlength={[3, "This field must be at least 8 characters."]} />
            </label>
          </Form>

          <button onClick={() => router.push('/register')}>
            <i>
              check in
            </i>
          </button>
        </div>
      </main>
    </div>
  )
}