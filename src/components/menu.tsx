//
'use client'
import { useState, useEffect } from 'react'
import useStore from "str/store";
import Session from 'sv/session';
import { getCookie, setCookie } from 'hp/local_cookie';
import { useRouter, usePathname } from 'next/navigation';
import MenuSvg from 'svg/menu_svg';
import 'st/menu.css';

export default function Menu() {
  const { session } = useStore((state) => ({ session: state.session }));
  const [show, setShow] = useState(false)
  const router = useRouter();
  const path = usePathname();

  function handleClick(url: string) {
    setShow(!show)
    router.push(url)
  }

  function handleLogout(url: string) {
    const user = {
      id: session.id,
      user: session.user,
      email: session.email,
    };

    Session.logOut(user, getCookie("access_token"));
    setCookie("access_token", null)
    setShow(!show)
    router.push('/login')
  }

  return (
    <>
      {
        <div className="menu_bar" >
          <button onClick={() => setShow(!show)}>
            <MenuSvg />
          </button>

          <nav style={{ right: !show && '0px', visibility: show && "visible" }}>
            <ul>
              {path !== '/dashboard' &&
                <li onClick={() => handleClick('/dashboard')}>Home</li>
              }
              {path !== '/dashboard/product/add' &&
                <li onClick={() => handleClick('/dashboard/product/add')}>Add phone</li>
              }
              {path !== '/dashboard/products' &&
                <li onClick={() => handleClick('/dashboard/products')}>List phone</li>
              }
              {path !== '/dashboard/admin' &&
                <li onClick={() => handleClick('/dashboard/admin')}>Admin</li>
              }
              <li onClick={() => handleLogout()}>Logout</li>
            </ul>
          </nav>
        </div>
      }
    </>
  )
}