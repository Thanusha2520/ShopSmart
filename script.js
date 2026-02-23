 // ===== MOBILE MENU =====
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // ===== SEARCH FUNCTION =====
      document.getElementById('searchBtn').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    let found = false;

    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();

        if (title.includes(searchTerm)) {
            product.style.display = 'block';
            found = true;
        } else {
            product.style.display = 'none';
        }
    });

    if (!found) {
        showNotification('No products found!', 'warning');
    }
});

        // ===== BUY BUTTON FUNCTION =====
        function handleBuy(product, price) {
            // Track click
            trackClick(product, price);
            
            // Show notification
            showNotification(`Redirecting to checkout for ${product}...`, 'success');
            
            // In real site, redirect to affiliate link
            function handleBuy(product, price) {
            trackClick(product, price);
            window.open('https://www.amazon.com', '_blank');
           }
        }

        // ===== REVIEW FUNCTION =====
        function showReview(product) {
            showNotification(`Loading ${product} review...`, 'info');
            setTimeout(() => {
                showNotification('Review page coming soon!', 'info');
            }, 1000);
        }

        // ===== COMPARISON TABS =====
        function switchTab(tab, event) {
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            showNotification(`Showing ${tab} products`, 'info');
        }

        // ===== NEWSLETTER FORM =====
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            
            if (email && email.includes('@')) {
                showNotification('Thanks for subscribing! Check your email.', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email', 'warning');
            }
        });

        // ===== TRACK CLICKS (SAFE) =====
        function trackClick(product, price) {
            // Store in localStorage (client-side only, no external tracking)
            let clicks = JSON.parse(localStorage.getItem('product_clicks') || '[]');
            clicks.push({
                product: product,
                price: price,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('product_clicks', JSON.stringify(clicks));
            console.log('Click tracked:', product);
        }

        // ===== NOTIFICATION SYSTEM =====
        function showNotification(message, type = 'info') {
            // Remove existing notification
            const existing = document.querySelector('.notification');
            if (existing) existing.remove();

            // Create notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            
            // Set icon based on type
            let icon = 'fa-info-circle';
            if (type === 'success') icon = 'fa-check-circle';
            if (type === 'warning') icon = 'fa-exclamation-triangle';
            
            notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // ===== ACTIVE LINK HIGHLIGHT =====
        function setActiveLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-menu a');
            
            window.addEventListener('scroll', () => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        }
        
        setActiveLink();

        // ===== SMOOTH SCROLL =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });