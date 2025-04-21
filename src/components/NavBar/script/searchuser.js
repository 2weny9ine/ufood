export const displayPopup = (title, message) => {
  const modalOverlay = document.createElement('div')
  modalOverlay.classList.add('custom-modal-overlay')

  const modal = document.createElement('div')
  modal.classList.add('custom-modal')

  modal.innerHTML = `
      <div class="custom-modal-header">
        <h5>${title}</h5>
        <button class="custom-close">&times;</button>
      </div>
      <div class="custom-modal-body">
        <p>${message}</p>
      </div>
    `

  modalOverlay.appendChild(modal)
  document.body.appendChild(modalOverlay)
  modal.querySelector('.custom-close').addEventListener('click', () => {
    document.body.removeChild(modalOverlay)
  })
  setTimeout(() => {
    if (document.body.contains(modalOverlay)) {
      document.body.removeChild(modalOverlay)
    }
  }, 4000)
}
