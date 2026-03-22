// REAL VADODARA RESIDENTIAL SOCIETIES
const flats = [
    { id: 1, bhk: 2, name: "Nilamber Palms", price: 18500, phone: "+919876543210", loc: "Vasna-Bhayli, Vadodara", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" },
    { id: 2, bhk: 3, name: "Shree Balaji Skyrise", price: 42000, phone: "+919988776655", loc: "Atladra, Vadodara", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" },
    { id: 3, bhk: 3, name: "Kalpvrishkh", price: 25000, phone: "+918877665544", loc: "Gotri, Vadodara", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600" },
    { id: 4, bhk: 4, name: "Pristine Residency", price: 55000, phone: "+917766554433", loc: "Akota, Vadodara", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600" },
    { id: 5, bhk: 1, name: "Siddharth Elegance", price: 11000, phone: "+919000011111", loc: "Sayajigunj, Vadodara", img: "https://images.unsplash.com/photo-1536376074432-8d64216a7244?w=600" },
    { id: 6, bhk: 2, name: "Vihav Sky", price: 21000, phone: "+918800112233", loc: "Bhayli, Vadodara", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600" }
];

let wishlist = JSON.parse(localStorage.getItem('v_wishlist')) || [];

// Render Engine
function filterFlats() {
    const bhk = document.getElementById('bhkFilter').value;
    const budget = document.getElementById('budgetFilter').value;
    const grid = document.getElementById('flatGrid');
    
    const filtered = flats.filter(f => (bhk === 'all' || f.bhk == bhk) && f.price <= budget);

    grid.innerHTML = filtered.map(f => {
        // MAP URL FOR REAL VADODARA SEARCH
        const searchQuery = encodeURIComponent(`${f.name} ${f.loc} Vadodara`);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

        return `
        <div class="card">
            <span class="badge">${f.bhk} BHK</span>
            <img src="${f.img}">
            <div style="padding:20px">
                <h3>${f.name}</h3>
                <p style="color:#64748b; font-size:12px; margin-bottom:15px"><i class="fa-solid fa-location-dot"></i> ${f.loc}</p>
                <p style="font-weight:800; color:#10b981; font-size:1.2rem;">₹${f.price.toLocaleString()}/mo</p>
                <div class="btn-group">
                    <a href="tel:${f.phone}" class="btn btn-call"><i class="fa-solid fa-phone"></i> Call</a>
                    <a href="${mapUrl}" target="_blank" class="btn btn-map"><i class="fa-solid fa-map-pin"></i> Map</a>
                </div>
                <button class="btn btn-save" onclick="saveProperty(${f.id})"><i class="fa-regular fa-heart"></i> Save Property</button>
            </div>
        </div>
    `}).join('');
}

// Wishlist Controls
function saveProperty(id) {
    const flat = flats.find(f => f.id === id);
    if (!wishlist.some(item => item.id === id)) {
        wishlist.push(flat);
        localStorage.setItem('v_wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
        alert(`${flat.name} Saved!`);
    } else {
        alert("Already saved!");
    }
}

function updateWishlistUI() {
    document.getElementById('saveBadge').innerText = wishlist.length;
    const list = document.getElementById('savedItemsList');
    list.innerHTML = wishlist.length === 0 ? '<p style="text-align:center;">Empty Wishlist</p>' : 
    wishlist.map(f => `
        <div style="background:#f1f5f9; padding:12px; border-radius:10px; margin-bottom:10px;">
            <p style="font-weight:700; font-size:14px;">${f.name}</p>
            <p style="color:#10b981; font-weight:700;">₹${f.price}</p>
            <button onclick="removeSaved(${f.id})" style="color:red; border:none; background:none; cursor:pointer; font-size:11px; margin-top:5px;">Remove</button>
        </div>
    `).join('');
}

function removeSaved(id) {
    wishlist = wishlist.filter(i => i.id !== id);
    localStorage.setItem('v_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

// Zervis AI Chatbot
let chatStep = 0;
function toggleChat() { document.getElementById('chatWindow').classList.toggle('hidden'); }
function toggleSavedSidebar() { document.getElementById('savedSidebar').classList.toggle('active'); }

function handleZervisMsg() {
    const input = document.getElementById('userInput');
    const msg = input.value.trim();
    if (!msg) return;

    appendChat(msg, 'user-msg');
    input.value = "";

    setTimeout(() => {
        if (chatStep === 0) {
            appendChat("Hi! I'm Zervis. This platform is created by Sudipta Manna. I'm your Vadodara property expert. What's your name?", "bot-msg");
            chatStep = 1;
        } else if (chatStep === 1) {
            appendChat(`Nice to meet you, ${msg}! What's your budget for a home in Vadodara?`, "bot-msg");
            chatStep = 2;
        } else {
            appendChat("Use our filters above to see real listings in Akota, Bhayli, or Gotri. Contact Sudipta for tours!", "bot-msg");
        }
    }, 1000);
}

function appendChat(text, type) {
    const body = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    div.innerText = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

// Initial Run
filterFlats();
updateWishlistUI();
document.getElementById('userInput').addEventListener('keypress', (e) => { if(e.key === 'Enter') handleZervisMsg(); });