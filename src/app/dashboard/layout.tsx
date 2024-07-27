//
import React from 'react'
import Menu from 'cp/menu'
import 'st/dashboard.css'

type Props = {
  children: React.ReactNode
}

export default function dashboardLayout({ children }: Props) {
  return (
    <div className="container-dashboard">
      <header>
        <h1>Tech Cell Xpress</h1>
        <Menu />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <i>
          Icons by <a href="https://icons8.com"><b> Icons8</b></a>  /
          Icons by
          <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwit6tzupqmHAxUFmYQIHWdvCDsQFnoECAcQAQ&url=https%3A%2F%2Ffonts.google.com%2Ficons&usg=AOvVaw3GIn4e7B1TOK2jsS3asDUl&opi=89978449">
            <b> google icons</b>
          </a>
        </i>
      </footer>
    </div>
  )
}
