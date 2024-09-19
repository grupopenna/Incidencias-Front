export function ArrowDown() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
        </svg>

    )
}

export function ArrowUp() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
      </svg>
      
    )
}

export function WithoutPhoto() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fillRule="evenodd"><path d="M6 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
    )
}

export function SearchIcon () {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
    )
}

export function CrossIcon () {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

export function LogOut () {
    return (
        <svg className='h-8 w-8 text-red-500'  viewBox='0 0 24 24'  fill='none'  stroke='currentColor'  strokeWidth='2'  strokeLinecap='round'  strokeLinejoin='round'> 
            <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' /> 
            <polyline points='16 17 21 12 16 7' /> 
            <line x1='21' y1='12' x2='9' y2='12' />
        </svg>
    )
}