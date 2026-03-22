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
        // FIXED REAL MAP URL: Searches specifically for society name + Vadodara
        const searchQuery = encodeURIComponent(`${f.name} ${f.loc} Vadodara`);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

        return `
        <div class="card">
            <span class="badge">${f.bhk} BHK</span>
            <img src="${f.img}">
            <div style="padding:20px">
                <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${f.name}</h3>
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

// Wishlist Logic
function saveProperty(id) {
    const flat = flats.find(f => f.id === id);
    if (!wishlist.some(item => item.id === id)) {
        wishlist.push(flat);
        localStorage.setItem('v_wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
        alert(`${flat.name} has been saved!`);
    } else {
        alert("This property is already in your wishlist.");
    }
}

function updateWishlistUI() {
    document.getElementById('saveBadge').innerText = wishlist.length;
    const list = document.getElementById('savedItemsList');
    list.innerHTML = wishlist.length === 0 ? '<p style="text-align:center; color:#666;">No saved flats yet.</p>' : 
    wishlist.map(f => `
        <div style="background:#f1f5f9; padding:15px; border-radius:12px; margin-bottom:12px;">
            <p style="font-weight:700; font-size:14px; margin-bottom:5px;">${f.name}</p>
            <p style="color:#10b981; font-weight:700; font-size:13px; margin:0;">₹${f.price}</p>
            <button onclick="removeSaved(${f.id})" style="color:#ef4444; border:none; background:none; cursor:pointer; font-size:11px; margin-top:10px; padding:0; text-decoration:underline;">Remove</button>
        </div>
    `).join('');
}

function removeSaved(id) {
    wishlist = wishlist.filter(i => i.id !== id);
    localStorage.setItem('v_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

// UI Controls
function toggleChat() { document.getElementById('chatWindow').classList.toggle('hidden'); }
function toggleSavedSidebar() { document.getElementById('savedSidebar').classList.toggle('active'); }

// Zervis AI Chatbot with Team Credits
let chatStep = 0;
function handleZervisMsg() {
    const input = document.getElementById('userInput');
    const msg = input.value.trim();
    if (!msg) return;

    appendChat(msg, 'user-msg');
    input.value = "";

    setTimeout(() => {
        if (chatStep === 0) {
            appendChat("Hi! I'm Zervis. This platform is created by Sudipta Manna, Mithun Yadav, Lakshay Purohit, and Mayank Sharma. I'm your Vadodara property expert. What's your name?", "bot-msg");
            chatStep = 1;
        } else if (chatStep === 1) {
            appendChat(`Nice to meet you, ${msg}! What's your monthly budget for a flat in Vadodara?`, "bot-msg");
            chatStep = 2;
        } else if (chatStep === 2) {
            appendChat(`Got it! Searching for flats around ₹${msg}. Feel free to use our filters in Akota, Gotri, or Bhayli. Contact our team for details!`, "bot-msg");
            chatStep = 3;
        } else {
            appendChat("I'm always here to help you find the best stay in Vadodara. Anything else?", "bot-msg");
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

// Init
filterFlats();
updateWishlistUI();
document.getElementById('userInput').addEventListener('keypress', (e) => { if(e.key === 'Enter') handleZervisMsg(); });
