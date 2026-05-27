/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS, INITIAL_REVIEWS } from './data';
import { Product, CartItem, Review, CategoryId, OrderDetails, AppOrder } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutUs } from './components/AboutUs';
import { StatsGrid } from './components/StatsGrid';
import { Testimonials } from './components/Testimonials';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { AiChatPage } from './components/AiChatPage';
import { LoginPage } from './components/LoginPage';
import { ReviewsPage } from './components/ReviewsPage';
import { AdminPanel } from './components/AdminPanel';
import { ProductsPage } from './components/ProductsPage';
import { ShoppingBag, Star, AlertTriangle, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  // Application Page State
  const [currentPage, setCurrentPage] = useState<'store' | 'products' | 'ai' | 'login' | 'reviews' | 'admin'>('store');

  // Application States
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<AppOrder[]>([]);
  
  // Modal toggle states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userSession, setUserSession] = useState<{ name: string; email: string; phone?: string; isAdmin?: boolean } | null>(null);

  // Success Notification popup
  const [notification, setNotification] = useState<string | null>(null);

  // Karusel slayd uchun ref va aylantirish funksiyalari
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 320;
      carouselRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 320;
      carouselRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  // Load cart, session and orders data on mount
  useEffect(() => {
    // 1. Restore Cart
    const savedCart = localStorage.getItem('roxon_cart_items');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart retrieval failed", e);
      }
    }

    // 2. Restore User Session
    const savedSession = localStorage.getItem('roxon_user_session');
    if (savedSession) {
      try {
        const decoded = JSON.parse(savedSession);
        setUserSession(decoded);
        if (decoded?.isAdmin) {
          setCurrentPage('admin');
        }
      } catch (e) {
        console.error("Session retrieval failed", e);
      }
    }

    // 3. Restore Orders (seed initial demo orders if none are present)
    const savedOrders = localStorage.getItem('roxon_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Orders retrieval failed", e);
      }
    } else {
      const initialSeed: AppOrder[] = [
        {
          id: 'RXN-741294',
          date: '25.05.2026',
          fullName: 'Sirojiddin Aliyev',
          phone: '+998 90 911 22 33',
          region: 'Toshkent shahar',
          address: 'Mirobod tumani, Nukus ko\'chasi, 44-uy',
          deliveryMethod: 'standart',
          paymentMethod: 'naqd',
          items: [
            { product: PRODUCTS[0], quantity: 1 }
          ],
          totalPrice: PRODUCTS[0]?.price || 2450000,
          status: 'Yangi'
        },
        {
          id: 'RXN-882145',
          date: '22.05.2026',
          fullName: 'Sardor Karimov',
          phone: '+998 93 540 12 34',
          region: 'Samarqand',
          address: 'Registon ko\'chasi, 18-uy, 5-xonadon',
          deliveryMethod: 'tezkor',
          paymentMethod: 'karta',
          items: [
            { product: PRODUCTS[0], quantity: 1 },
            { product: PRODUCTS[1], quantity: 1 }
          ],
          totalPrice: (PRODUCTS[0]?.price || 2450000) + (PRODUCTS[1]?.price || 12800000) + 60000,
          status: 'Yetkazilmoqda'
        }
      ];
      setOrders(initialSeed);
      localStorage.setItem('roxon_orders', JSON.stringify(initialSeed));
    }
  }, []);

  // Sync cart and session persistency
  const saveCartToStorage = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('roxon_cart_items', JSON.stringify(items));
  };

  // Notification flash helper
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Nav scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === 'ai-chat') {
      if (!userSession) {
        setCurrentPage('login');
        triggerNotification("ROXON AI bilan bog'lanish va savol berish uchun avval tizimga kiting!");
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      setCurrentPage('ai');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (sectionId === 'login-page') {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (sectionId === 'admin-page-state') {
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (sectionId === 'reviews' || sectionId === 'reviews-page') {
      setCurrentPage('reviews');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (sectionId === 'products') {
      setCurrentPage('products');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Go back to main product catalog store
    setCurrentPage('store');

    setTimeout(() => {
      let targetId = sectionId;
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Search input change handler
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && currentPage !== 'products') {
      setCurrentPage('products');
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (!userSession) {
      setCurrentPage('login');
      triggerNotification("Mahsulotlarni savatga qo'shish va sotib olish uchun avval shaxsiy hisobingizga kiring!");
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    
    const existing = cartItems.find((item) => item.product.id === product.id);
    let updated: CartItem[];
    if (existing) {
      updated = cartItems.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cartItems, { product, quantity: 1 }];
    }
    
    saveCartToStorage(updated);
    triggerNotification(`"${product.name}" muvaffaqiyatli savatga qo'shildi!`);
  };

  const handleUpdateQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updated = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.product.id !== productId);
    saveCartToStorage(updated);
  };

  // Order placing callbacks
  const handleOrderSuccess = (orderId: string, details: OrderDetails) => {
    // Calculate final price with delivery options
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const deliveryBase = subtotal > 5000000 ? 0 : 45000;
    const deliveryCost = details.deliveryMethod === 'tezkor' ? deliveryBase + 60000 : deliveryBase;
    const totalPrice = subtotal + deliveryCost;

    const newOrder: AppOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('uz-UZ'),
      fullName: details.fullName,
      phone: details.phone,
      region: details.region,
      address: details.address,
      deliveryMethod: details.deliveryMethod,
      paymentMethod: details.paymentMethod,
      items: [...cartItems],
      totalPrice: totalPrice,
      status: 'Yangi'
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('roxon_orders', JSON.stringify(updatedOrders));

    // Clear shopping cart on successful transaction
    saveCartToStorage([]);
    triggerNotification(`Xaridingiz rasmiylashtirildi! Tartib raqami: ${orderId}`);
  };

  // Authenticate user login
  const handleLoginSuccess = (name: string, email: string, phone: string = '+998 90 955 88 11', isAdmin: boolean = false) => {
    const session = { name, email, phone, isAdmin };
    setUserSession(session);
    localStorage.setItem('roxon_user_session', JSON.stringify(session));
    
    if (isAdmin) {
      setCurrentPage('admin');
      triggerNotification(`Xush kelibsiz Administrator! Admin paneli faollashtirildi.`);
    } else {
      triggerNotification(`Salom, ${name}! Tizimga muvaffaqiyatli kirdingiz.`);
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    localStorage.removeItem('roxon_user_session');
    setCurrentPage('store');
    triggerNotification(`Tizimdan chiqdingiz.`);
  };

  // Administrative panel order management handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: AppOrder['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('roxon_orders', JSON.stringify(updated));
    triggerNotification(`Buyurtma #${orderId} holati "${newStatus}" ga o'zgartirildi.`);
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem('roxon_orders', JSON.stringify(updated));
    triggerNotification(`Buyurtma #${orderId} o'chirildi.`);
  };

  // Add customized customer reviews
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'authorInitials'>) => {
    const initials = newReview.author
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const fullReview: Review = {
      ...newReview,
      id: 'rev-' + Date.now(),
      authorInitials: initials || 'MX',
      date: new Date().toLocaleDateString('uz-UZ')
    };

    const nextReviews = [fullReview, ...reviews];
    setReviews(nextReviews);
    triggerNotification("Fikringiz uchun rahmat! Sharh muvaffaqiyatli chop etildi.");
  };

  // Filters application computation
  const filteredProducts = PRODUCTS.filter((product) => {
    const catMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 font-sans flex flex-col selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Floating alert/success bubble popup */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-neutral-950 px-5 py-3.5 rounded-xl font-bold text-xs md:text-sm shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Sparkles className="w-5 h-5 animate-spin text-neutral-900 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {currentPage === 'admin' ? (
        <AdminPanel
          onBackToStore={() => handleNavigate('home')}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onLogoutAdmin={handleLogout}
        />
      ) : currentPage === 'ai' ? (
        <AiChatPage
          onBackToStore={() => handleNavigate('home')}
          userName={userSession?.name}
        />
      ) : currentPage === 'reviews' ? (
        <ReviewsPage
          onBackToStore={() => handleNavigate('home')}
          reviews={reviews}
          onAddReview={handleAddReview}
          userName={userSession?.name}
          onNavigateToLogin={() => handleNavigate('login-page')}
        />
      ) : currentPage === 'products' ? (
        <>
          <Header
            cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            onCartClick={() => setIsCartOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            activeSection="products"
            onNavigate={handleNavigate}
            onLoginClick={() => handleNavigate('login-page')}
            userName={userSession?.name}
            onLogout={handleLogout}
            isAdmin={userSession?.isAdmin || false}
          />
          <main className="flex-1 min-h-screen">
            <ProductsPage
              onBackToStore={() => handleNavigate('home')}
              products={PRODUCTS}
              categories={CATEGORIES}
              initialCategory={selectedCategory}
              initialSearchQuery={searchQuery}
              onAddToCart={handleAddToCart}
              onViewDetails={(prod) => setSelectedProduct(prod)}
            />
          </main>
          <Footer
            onCategoryFilter={(catId) => {
              setSelectedCategory(catId);
              handleNavigate('products');
            }}
            onNavigate={handleNavigate}
          />
        </>
      ) : currentPage === 'login' ? (
        <LoginPage
          onBackToStore={() => handleNavigate('home')}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          onUpdateProfile={(name, email, phone) => {
            const session = { name, email, phone };
            setUserSession(session);
            localStorage.setItem('roxon_user_session', JSON.stringify(session));
            triggerNotification(`Profil ma'lumotlari muvaffaqiyatli yangilandi.`);
          }}
          currentUser={userSession ? { name: userSession.name, email: userSession.email, phone: userSession.phone || '', isAdmin: userSession.isAdmin || false } : undefined}
        />
      ) : (
        <>
          {/* Main Header / TopAppBar Section */}
          <Header
            cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            onCartClick={() => setIsCartOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onLoginClick={() => handleNavigate('login-page')}
            userName={userSession?.name}
            onLogout={handleLogout}
            isAdmin={userSession?.isAdmin || false}
          />

          {/* Body contents */}
          <main className="flex-1 animate-fade-in">
            {/* Dynamic Hero banner */}
            <Hero
              onExploreProducts={() => handleNavigate('products')}
              onAboutClick={() => handleNavigate('about')}
            />

            {/* Dynamic Category List selector */}
            <Categories
              categories={CATEGORIES.map(cat => ({
                ...cat,
                // Dynamically recalculate count based on database listing
                count: cat.id === 'all' 
                  ? PRODUCTS.length 
                  : PRODUCTS.filter(p => p.category === cat.id).length
              }))}
              selectedCategory={selectedCategory}
              onSelectCategory={(id) => {
                setSelectedCategory(id);
                // Scroll down so they see their selection filtering results immediately
                const element = document.getElementById('products-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            />

            {/* Dynamic Product catalog box */}
            <section id="products-section" className="py-12 px-6 md:px-12 w-full max-w-7xl mx-auto scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">
                    Katalog
                  </span>
                  <h2 className="text-3xl font-extrabold text-white">
                    {selectedCategory === 'all' 
                      ? "Barcha mahsulotlar" 
                      : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  </h2>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end flex-wrap sm:flex-nowrap">
                  {searchQuery && (
                    <span className="text-xs text-gray-400 bg-neutral-900 border border-white/5 py-1.5 px-3 rounded-lg">
                      Qidiruv: <span className="text-amber-500 font-bold">"{searchQuery}"</span> bo'yicha ({filteredProducts.length} ta natija)
                    </span>
                  )}

                  {/* Navigatsiya tugmalari (O'ng va Chap arrow) */}
                  {filteredProducts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={scrollLeft}
                        className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-amber-500 text-gray-400 hover:text-amber-500 flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer active:scale-95"
                        title="Chapga surish"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={scrollRight}
                        className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-amber-500 text-gray-400 hover:text-amber-500 flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer active:scale-95"
                        title="O'ngga surish"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Grid or Empty indicator */}
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center p-6 bg-neutral-900/20 border border-dashed border-white/5 rounded-3xl">
                  <AlertTriangle className="w-12 h-12 text-amber-500/80 mb-4 animate-bounce" />
                  <h3 className="text-lg font-bold text-white mb-2">Hech qanday mahsulot topilmadi</h3>
                  <p className="text-sm text-gray-400 max-w-xs mb-6">
                    Iltimos, boshqa qidiruv so'zini yoki boshqa turkumdan birini tanlang.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-5 py-2.5 bg-neutral-850 hover:bg-neutral-800 text-amber-500 text-xs font-bold rounded-xl border border-white/5 transition-all cursor-pointer"
                  >
                    Filtrlarni tozalash
                  </button>
                </div>
              ) : (
                <div className="relative">
                  {/* Gorizontal karusel ro'yxati */}
                  <div 
                    ref={carouselRef}
                    className="flex overflow-x-auto gap-2 sm:gap-6 pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
                  >
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="w-[140px] min-[375px]:w-[170px] sm:w-[325px] shrink-0 snap-start"
                      >
                        <ProductCard
                          product={product}
                          onAddToCart={(prod, e) => handleAddToCart(prod, e)}
                          onViewDetails={(prod) => setSelectedProduct(prod)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Ko'rsatkich gradientli o'ng burchak (desktopda) */}
                  <div className="hidden lg:block absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none" />
                </div>
              )}
            </section>

            {/* Presentation and About Company */}
            <AboutUs onLearnMore={() => handleNavigate('contact')} />

            {/* Service Core Benefits sections */}
            <StatsGrid />

            {/* Customer Reviews & Feedback lists */}
            <Testimonials
              reviews={reviews}
              onWriteReviewClick={() => handleNavigate('reviews-page')}
            />

            {/* Interactive Consultation and Contact lines */}
            <ContactUs />
          </main>

          {/* Global rich multi-link Footer */}
          <Footer
            onCategoryFilter={(catId) => {
              setSelectedCategory(catId);
              handleNavigate('products');
            }}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* Dynamic Product Detail Lightbox Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Persistent Shopping Cart Sidebar Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          if (!userSession) {
            setCurrentPage('login');
            triggerNotification("Xaridni amalga oshirish va buyurtmani rasmiylashtirish uchun tizimga kirishingiz shart!");
            window.scrollTo({ top: 0, behavior: 'instant' });
          } else {
            setIsCheckoutOpen(true);
          }
        }}
      />

      {/* Shipping Address checkout form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Authentication cabinet Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
