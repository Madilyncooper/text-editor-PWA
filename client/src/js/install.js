const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {  
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
  });

butInstall.addEventListener('click', async () => {
    const click = window.deferredPrompt;
  
if (!click) {return};
    click.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
  
  
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
