const patternText = new RegExp(/^[a-zA-Z ]+$/)
const patternEmail = new RegExp(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
const patternNumber = new RegExp(/^[0-9]*(\.?)[0-9]+$/)
// const patternEmail = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
// const patternNumberAndText = new RegExp(/^[0-9a-zA-Z ]+$/);

export function validateRegister(input, setMesaggeError) {
  const errors = {}
  if (!input.fullName || input.fullName?.length <= 0 || !patternText.test(input.userName)) {
    errors.name = 'Complete de forma correcta'
  }
  if (!input.email || input.email?.length <= 0 || !patternEmail.test(input.email)) {
    errors.email = 'Complete de forma correcta'
  }
  if (!input.dni || input.dni.length < 8 || input.dni.length > 10 || !patternNumber.test(input.dni)) {
    errors.dni = 'Complete de forma correcta'
  }
  if (!input.password || input.password.length < 10) {
    errors.password = 'Debe tener minimo de 10 digitos'
  }
  if (input.empresa.length === 0) {
    errors.empresa = 'Campo obligatorio'
  }
  if (input.area === '') {
    errors.area = 'Campo obligatorio'
  }
  if (input.permisos === '') {
    errors.permisos = 'Campo obligatorio'
  }
  Object.keys(errors).length ? setMesaggeError(true) : setMesaggeError(false)
  return errors
}

export function validateLogin(input, setMesaggeError) {
  const errors = {}
  if (!input.email || input.email?.length <= 0 || !patternEmail.test(input.email)) {
    errors.email = 'Complete de forma correcta'
  }
  if (!input.password || input.password.length < 10) {
    errors.password = 'Debe tener minimo de 10 digitos'
  }
  Object.keys(errors).length ? setMesaggeError(true) : setMesaggeError(false)
  return errors
}
