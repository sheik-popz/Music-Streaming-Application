import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const Navbarcontainer = () => {
  return (
<header className='h-[70px] w-[100%] bg-slate-700 sticky top-0 z-10 shadow-md'>
<article className='w-[95%] h-[100%] flex justify-between m-auto items-center'>
    <Logo/>
    <Menu/>
</article>
</header>
  )
}

export default Navbarcontainer