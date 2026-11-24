(function () {
  var light = false
  try {
    light = localStorage.getItem('lp_theme') === 'light'
  } catch {}
  var root = document.documentElement
  root.classList.toggle('light', light)
  root.dataset.theme = light ? 'light' : 'dark'
  var meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', light ? '#ffffff' : '#050505')
})()
