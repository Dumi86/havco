const equipment = [
    {
        id: 1,
        name: 'Havco Bail loader',
        category: 'Bail loader',
        brand: 'Havco',
        price: 'contact for price',
        specs: 'it load alot of bail',
        image: 'images/bail loaders.jpg',
        description: 'High-performance Bail loader with advanced features'
    },
    {
        id: 2,
        name: 'Havco Crop Sprayer',
        category: 'sprayers',
        brand: 'Havco',
        price: 'contact for price',
        specs: '2000L Tank, 24m Boom',
        image: 'images/crop sprayer.jpg',
        description: 'Precision spraying with advanced control systems'
    },
    {
        id: 3,
        name: 'Havco Manure spreader',
        category: 'Manure spreader',
        brand: 'Havco',
        price: 'contact for price',
        specs: '350 HP, 9m cutting width',
        image: 'images/manure spreader.png',
        description: 'Efficient Manure spreading solution'
    },
    {
        id: 4,
        name: 'Havco storage tank',
        category: 'Storage tanks',
        brand: 'Havco',
        price: 'contact for price',
        specs: 'stores alot of stuff',
        image: 'images/storage tanks.jpg',
        description: 'Advanced precision planting system'
    },
    {
        id: 5,
        name: 'Havco grain carts',
        category: 'grain carts',
        brand: 'Havco',
        price: 'contact for price',
        specs: 'Coverage: 100 hectares',
        image: 'images/grain carts.jpg',
        description: 'Complete gain coverage for the whole farm'
    },
    {
        id: 6,
        name: 'Havco grain sieves',
        category: 'grain sieves',
        brand: 'Havco',
        price: 'contact for price',
        specs: '2000L capacity, Variable Rate',
        image: 'images/grain sieves.jpg',
        description: 'Intelligent grain distribution system'
    }
];
// DOM Elements
const contactForm = document.querySelector('.contact-form');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const equipmentGrid = document.getElementById('equipmentGrid');

// Form submission handling
contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});

// Enhanced equipment display function
function displayEquipment(filteredEquipment = equipment) {
    if (!equipmentGrid) return;
    
    equipmentGrid.innerHTML = filteredEquipment.map(item => `
        <div class="category-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p class="brand">${item.brand}</p>
                <p class="price">${item.price.toLocaleString()}</p>
                <p><strong>Specifications:</strong> ${item.specs}</p>
                <p>${item.description}</p>
                <button class="glossy-button">View Details</button>
            </div>
        </div>
    `).join('');
}

// Add sorting functionality
function sortEquipment(equipment, sortBy = 'name') {
    return [...equipment].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        return a[sortBy].localeCompare(b[sortBy]);
    });
}

// Equipment filtering function
function filterEquipment() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const category = categoryFilter?.value || 'all';

    const filtered = equipment.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                            item.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || item.category === category;
        return matchesSearch && matchesCategory;
    });

    displayEquipment(filtered);
}

// Event listeners
searchInput?.addEventListener('input', filterEquipment);
categoryFilter?.addEventListener('change', filterEquipment);

// Initialize map
function initMap() {
    if (typeof google !== 'undefined') {
        const mapOptions = {
            zoom: 15,
            center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }, // Replace with actual coordinates
            styles: [
                {
                    featureType: "all",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }]
                }
                // Add more custom styles as needed
            ]
        };
        
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        new google.maps.Marker({
            position: mapOptions.center,
            map: map,
            title: 'HAVCO Equipment'
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    displayEquipment();
    if (typeof google !== 'undefined') {
        initMap();
    }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add at the end of your script.js file
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('grow');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('grow');
});
