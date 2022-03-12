export function showErrors() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="error">
      Ошибка ответа от сервера!
    </div>
  `)

  setTimeout(() => {
    const error = document.querySelector('.error')
    error.remove()
  }, 3000)
}