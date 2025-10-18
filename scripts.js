
const CONTACT = {
  phoneWhatsApp: '+573245328182', // número final confirmado
  instagramProfile: 'https://instagram.com/dulcetentacionjtdcm',
  email: 'dulcetentacionjtdcm@gmail.com'
};

const medianos = [
  {name:'Vainilla', price:50000},
  {name:'Vainilla Oreo', price:52000},
  {name:'Vainilla Chocolate', price:53000},
  {name:'Naranja', price:52000},
  {name:'Chocolate', price:60000},
  {name:'Zanahoria', price:60000}
];
const grandes = [
  {name:'Vainilla', price:65000},
  {name:'Vainilla Oreo', price:70000},
  {name:'Vainilla Chocolate', price:70000},
  {name:'Naranja', price:70000},
  {name:'Chocolate', price:85000},
  {name:'Zanahoria', price:85000}
];

function numberWithDots(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');}

function buildCards(list, containerId, sizeLabel){
  const container = document.getElementById(containerId);
  list.forEach(item=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <div class="left">
        <div class="title">${item.name}</div>
        <div class="sub">${sizeLabel}</div>
      </div>
      <div class="right">
        <div class="price">$${numberWithDots(item.price)}</div>
        <div class="card-actions" style="margin-top:8px">
          <button class="small wh" onclick="orderWhatsApp('${sizeLabel}','${item.name}',${item.price})">Pedir por WhatsApp</button>
          <button class="small ig" onclick="orderInstagram('${sizeLabel}','${item.name}',${item.price})">Pedir por Instagram</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function orderWhatsApp(size, name, price){
  const msg = encodeURIComponent(`Hola, quiero pedir un postre ${size.toLowerCase()} de ${name}.`);
  const url = `https://wa.me/${CONTACT.phoneWhatsApp.replace(/\D/g,'')}?text=${msg}`;
  window.open(url, '_blank');
}

function orderInstagram(size, name, price){
  // Copy message to clipboard and open instagram profile
  const message = `Hola, quiero pedir un postre ${size.toLowerCase()} de ${name}.`;
  navigator.clipboard.writeText(message).then(()=>{
    alert('Mensaje copiado al portapapeles. Ábrelo en Instagram y pégalo en un nuevo mensaje.');
    window.open(CONTACT.instagramProfile, '_blank');
  }).catch(()=>{
    // fallback: just open profile
    window.open(CONTACT.instagramProfile, '_blank');
  });
}

function openWhatsApp(){ const msg = encodeURIComponent('Hola, tengo una pregunta sobre los postres.'); window.open(`https://wa.me/${CONTACT.phoneWhatsApp.replace(/\D/g,'')}?text=${msg}`,'_blank'); }

function scrollToSection(id){ const el = document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); }
function closeModal(){ document.getElementById('modal').style.display='none'; }

// init
document.addEventListener('DOMContentLoaded',()=>{
  buildCards(medianos,'medianos','Mediano');
  buildCards(grandes,'grandes','Grande');
  // wire quick-contact buttons
  document.getElementById('instaBtn').href = CONTACT.instagramProfile;
  document.getElementById('emailBtn').href = 'mailto:'+CONTACT.email;
});
