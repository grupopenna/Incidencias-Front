const Button = (
    {
     onClick, 
     Label, 
     loader = false,
     variante = 'primary', 
    ...props
}) => {

  const backgroundButton = variante === 'primary' ?  'bg-buttonBg' : 'bg-slate-300'
  const textColor = variante === 'primary' ? 'text-white' : 'text-black'

  return (
    <button 
        {...props}
        onClick={onClick} 
        className={`${backgroundButton}  py-2 mt-4 rounded-sm ${textColor} px-4 hover:${backgroundButton}/80`}>
    {
      loader
      ? <div className='w-6 animate-spin border-2  border-white border-l-transparent rounded-full h-6' />
      : Label
    }
  </button>
  )
}

export default Button
