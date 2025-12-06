import React, {
  useState,
  useEffect,
  useMemo,
  useRef
} from "react";
import {
  ShoppingCart,
  Menu,
  Search,
  ShieldCheck,
  Zap,
  Heart,
  Facebook,
  Phone,
  Mail,
  ChevronDown,
  ShoppingBag,
  Star,
  Gamepad2,
  PlaySquare,
  BookOpen,
  PenTool,
  LayoutGrid,
  MessageCircle,
  BadgeCheck,
  Headphones,
  Flame,
  ArrowRight,
  Cloud,
  Code,
  BarChart3,
  Bot,
  X,
  CreditCard,
  Copy,
  Monitor,
  HelpCircle,
  FileText,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  Clock,
  UserCheck,
  Key,
  Eye,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from "lucide-react";

import {
  PRODUCTS,
  CATEGORY_LABELS,
  FAQS,
  REVIEWS,
  FEATURES,
  BANK_ACCOUNTS
} from "./constants";
import { Product, CategoryType, CartItem } from "./types";
import { AIChat } from "./components/AIChat";
import { StatsWidget } from "./components/StatsWidget";

type ViewType = "shop" | "guide" | "policy" | "payment";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>("shop");
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] =
    useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [modalDuration, setModalDuration] =
    useState<string>("1 Tháng");
  const [modalType, setModalType] =
    useState<"Upgrade" | "Provided">("Upgrade");
  const [upgradeInfo, setUpgradeInfo] = useState({
    email: "",
    password: ""
  });

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    contact: "",
    upgradeAccount: ""
  });
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [zoomedQR, setZoomedQR] = useState<string | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] =
    useState(0);

  const mainSectionRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  // click outside dropdown / search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // scroll top khi đổi view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  // lưu favorite
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ---------------------------
  // 🔥 HÀM TÍNH GIÁ MỚI
  // ---------------------------
  const calculatePrice = (product: Product, duration: string) => {
    const base = product.price;

    switch (duration) {
      case "1 Tháng":
        return base; // giá gốc

      case "3 Tháng":
        return base * 2; // x2

      case "6 Tháng":
        return base * 6 + 80000; // +80k

      case "12 Tháng":
        return base * 12 + 50000; // +50k

      default:
        return base;
    }
  };

  const currentModalPrice = selectedProduct
    ? calculatePrice(selectedProduct, modalDuration)
    : 0;

  const toggleFavorite = (
    productId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      let matchesCategory = true;
      if (activeCategory === "BestSeller") {
        matchesCategory = product.tags.includes("Best Seller");
      } else if (activeCategory !== "All") {
        matchesCategory = product.category === activeCategory;
      }
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const featuredProduct = useMemo(() => {
    if (activeCategory === "BestSeller") {
      return (
        filteredProducts.find((p) => p.rating === 5) ||
        filteredProducts[0]
      );
    }
    return null;
  }, [activeCategory, filteredProducts]);

  const addToCart = (
    product: Product,
    quantity = 1,
    duration?: string,
    type?: "Upgrade" | "Provided",
    credentials?: { email?: string; password?: string }
  ) => {
    const finalPrice = duration
      ? calculatePrice(product, duration)
      : product.price;

    const newItem: CartItem = {
      ...product,
      price: finalPrice,
      quantity,
      selectedDuration: duration || "1 Tháng",
      selectedType: type,
      accountCredentials: credentials
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view === "shop") {
      setActiveCategory("All");
      setIsOrderSuccess(false);
    }
  };

  const handleCategoryChange = (cat: CategoryType) => {
    setActiveView("shop");
    setActiveCategory(cat);
    setMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setTimeout(
      () =>
        mainSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        }),
      100
    );
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.contact) {
      alert("Vui lòng nhập đầy đủ thông tin liên hệ!");
      return;
    }

    console.log("ORDER:", {
      ...customerInfo,
      cartItems: cart,
      total: cartTotal,
      date: new Date().toISOString()
    });

    setIsOrderSuccess(true);
    setCart([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setModalDuration("1 Tháng");
    setModalType("Upgrade");
    setUpgradeInfo({ email: "", password: "" });
  };

  const handleModalSubmit = () => {
    if (!selectedProduct) return;

    if (modalType === "Upgrade") {
      if (!upgradeInfo.email || !upgradeInfo.password) {
        alert(
          "Vui lòng nhập Email và Mật khẩu tài khoản cần nâng cấp."
        );
        return;
      }
      addToCart(selectedProduct, 1, modalDuration, "Upgrade", {
        email: upgradeInfo.email,
        password: upgradeInfo.password
      });
    } else {
      window.open("https://zalo.me/0916882278", "_blank");
    }
  };

  const handleReviewNav = (dir: "next" | "prev") => {
    if (dir === "next") {
      setCurrentReviewIndex((prev) =>
        prev + 3 >= REVIEWS.length ? 0 : prev + 3
      );
    } else {
      setCurrentReviewIndex((prev) =>
        prev - 3 < 0 ? Math.max(0, REVIEWS.length - 3) : prev - 3
      );
    }
  };

  const visibleReviews = REVIEWS.slice(
    currentReviewIndex,
    currentReviewIndex + 3
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "All":
        return <LayoutGrid className="w-4 h-4" />;
      case "BestSeller":
        return <Flame className="w-4 h-4" />;
      case "Entertainment":
        return <PlaySquare className="w-4 h-4" />;
      case "Learning":
        return <BookOpen className="w-4 h-4" />;
      case "Design":
        return <PenTool className="w-4 h-4" />;
      case "Game":
        return <Gamepad2 className="w-4 h-4" />;
      case "Combo":
        return <Zap className="w-4 h-4" />;
      case "AI":
        return <Bot className="w-4 h-4" />;
      case "Cloud":
        return <Cloud className="w-4 h-4" />;
      case "Dev":
        return <Code className="w-4 h-4" />;
      case "SEO":
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return (
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
        );
      case "Zap":
        return <Zap className="w-8 h-8 text-yellow-400" />;
      case "BadgeCheck":
        return (
          <BadgeCheck className="w-8 h-8 text-green-400" />
        );
      case "Headphones":
        return (
          <Headphones className="w-8 h-8 text-pink-400" />
        );
      default:
        return <ShieldCheck className="w-8 h-8" />;
    }
  };

  const dropdownCategories: { id: CategoryType; label: string }[] =
    [
      { id: "AI", label: "AI Tools" },
      { id: "Entertainment", label: "Giải trí" },
      { id: "Learning", label: "Học tập" },
      { id: "Design", label: "Thiết kế" },
      { id: "Game", label: "Game" },
      { id: "Cloud", label: "Cloud" },
      { id: "Combo", label: "Combo Tiết Kiệm" }
    ];

  // =================== JSX ===================

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans overflow-x-hidden relative">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-[#0B1120]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">
            {/* logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
              onClick={() => handleNavigate("shop")}
            >
              <img
                src="https://sf-static.upanhlaylink.com/img/image_2025120615bef4abbe3c3edc15f2538728f1f3b5.jpg"
                alt="KACE Logo"
                className="w-10 h-10 object-contain rounded-lg border border-white/10 p-1 bg-white/5"
              />
              <span className="font-bold text-xl tracking-wider text-white group-hover:text-indigo-400 transition-colors hidden sm:block">
                KACE STORE
              </span>
              <span className="font-bold text-lg tracking-wider text-white group-hover:text-indigo-400 transition-colors sm:hidden">
                KACE
              </span>
            </div>

            {/* desktop nav */}
            <div className="hidden xl:flex items-center gap-8">
              <button
                onClick={() => handleNavigate("shop")}
                className={`text-sm font-medium hover:text-indigo-400 transition-colors ${
                  activeView === "shop" &&
                  activeCategory === "All"
                    ? "text-indigo-400"
                    : "text-slate-300"
                }`}
              >
                Trang chủ
              </button>

              <div
                className="relative"
                ref={dropdownRef}
              >
                <button
                  onClick={() =>
                    setIsDropdownOpen((v) => !v)
                  }
                  className={`flex items-center gap-1 text-sm font-medium hover:text-indigo-400 transition-colors ${
                    activeView === "shop" &&
                    dropdownCategories.some(
                      (c) => c.id === activeCategory
                    )
                      ? "text-indigo-400"
                      : "text-slate-300"
                  }`}
                >
                  Danh mục
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#111827] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 flex flex-col z-50">
                    {dropdownCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          handleCategoryChange(cat.id)
                        }
                        className={`text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors flex items-center gap-3 ${
                          activeCategory === cat.id &&
                          activeView === "shop"
                            ? "text-indigo-400 bg-white/5"
                            : "text-slate-300"
                        }`}
                      >
                        {getCategoryIcon(cat.id)}
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() =>
                  handleCategoryChange("BestSeller")
                }
                className={`text-sm font-medium hover:text-yellow-400 transition-colors flex items-center gap-1 ${
                  activeCategory === "BestSeller" &&
                  activeView === "shop"
                    ? "text-yellow-400"
                    : "text-slate-300"
                }`}
              >
                Top Bán Chạy
                <Flame className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleCategoryChange("Combo")}
                className="text-sm font-medium text-slate-300 hover:text-red-400 transition-colors"
              >
                Khuyến Mãi
              </button>

              <button
                onClick={scrollToFooter}
                className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors"
              >
                Liên hệ / Hỗ trợ
              </button>
            </div>

            {/* actions */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* search desktop */}
              <div
                className="relative hidden lg:block group"
                ref={searchRef}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Tìm Netflix, ChatGPT..."
                  className="bg-slate-800/50 border border-slate-700/50 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-32 transition-all focus:w-52 placeholder-slate-500 text-slate-200"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                    if (e.target.value) setActiveView("shop");
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                {showSuggestions &&
                  searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 w-64">
                      <div className="px-4 py-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-900/50">
                        Gợi ý tìm kiếm
                      </div>
                      {searchSuggestions.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSearchQuery(p.name);
                            setShowSuggestions(false);
                            setActiveView("shop");
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors flex items-center gap-2"
                        >
                          <Search className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate">
                            {p.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              {/* cart btn */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 sm:p-3 text-slate-300 hover:text-indigo-400 transition-all hover:scale-110 bg-slate-800/50 rounded-full border border-white/5 hover:border-indigo-500/30"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B1120]">
                    {cart.reduce(
                      (a, b) => a + b.quantity,
                      0
                    )}
                  </span>
                )}
              </button>

              {/* mobile menu btn */}
              <button
                className="xl:hidden p-2.5 sm:p-3 text-slate-300 bg-slate-800/50 rounded-full border border-white/5 hover:bg-slate-800"
                onClick={() =>
                  setMobileMenuOpen((v) => !v)
                }
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0B1120] border-t border-slate-800 p-4 space-y-2 shadow-2xl overflow-y-auto max-h-[80vh]">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Tìm tài khoản..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setActiveView("shop");
                }}
              />
            </div>

            <button
              onClick={() => handleNavigate("shop")}
              className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl transition-colors ${
                activeView === "shop" &&
                activeCategory === "All"
                  ? "bg-indigo-600/20 text-indigo-400"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Trang chủ
            </button>

            <div>
              <button
                onClick={() =>
                  setIsMobileDropdownOpen((v) => !v)
                }
                className="flex items-center justify-between w-full text-left py-3 px-4 rounded-xl text-slate-300 hover:bg-slate-800"
              >
                <span className="flex items-center gap-3">
                  <Monitor className="w-4 h-4" />
                  Danh mục
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isMobileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMobileDropdownOpen && (
                <div className="pl-4 space-y-1 mt-1 border-l-2 border-slate-800 ml-4">
                  {dropdownCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        handleCategoryChange(cat.id)
                      }
                      className={`block w-full text-left py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        activeCategory === cat.id &&
                        activeView === "shop"
                          ? "text-indigo-400 bg-white/5"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {getCategoryIcon(cat.id)}
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() =>
                handleCategoryChange("BestSeller")
              }
              className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl transition-colors ${
                activeCategory === "BestSeller"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Flame className="w-4 h-4" />
              Top Bán Chạy
            </button>

            <button
              onClick={() => handleCategoryChange("Combo")}
              className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-red-400"
            >
              <Zap className="w-4 h-4" />
              Khuyến Mãi
            </button>

            <div className="border-t border-slate-800 my-2 pt-2">
              <button
                onClick={() => handleNavigate("guide")}
                className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl transition-colors ${
                  activeView === "guide"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                Hướng dẫn & FAQ
              </button>
              <button
                onClick={() => handleNavigate("policy")}
                className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl transition-colors ${
                  activeView === "policy"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Chính sách & Điều khoản
              </button>
            </div>
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-[#0f172a] h-full shadow-2xl p-6 flex flex-col border-l border-white/5">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">
                  Giỏ hàng
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p>Chưa có sản phẩm nào</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-indigo-400 text-sm font-medium hover:underline"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 bg-slate-800/40 p-3 rounded-xl border border-white/5 hover:border-indigo-500/30"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-contain bg-white/5 p-1"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                          <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                            {item.selectedDuration ||
                              "1 Tháng"}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] ${
                              item.selectedType ===
                              "Upgrade"
                                ? "bg-indigo-900/50 text-indigo-300"
                                : item.selectedType ===
                                  "Provided"
                                ? "bg-green-900/50 text-green-300"
                                : "bg-slate-900 text-slate-300"
                            }`}
                          >
                            {item.selectedType ===
                            "Upgrade"
                              ? "Nâng cấp"
                              : item.selectedType ===
                                "Provided"
                              ? "Cấp sẵn"
                              : item.usage}
                          </span>
                        </p>
                        {item.selectedType === "Upgrade" &&
                          item.accountCredentials?.email && (
                            <p className="text-[10px] text-slate-500 mt-1 truncate">
                              Acc:{" "}
                              {
                                item.accountCredentials
                                  .email
                              }
                            </p>
                          )}
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-indigo-400 font-bold text-sm">
                          {formatCurrency(item.price)}
                        </span>
                        <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-1 border border-white/5">
                          <button
                            onClick={() =>
                              removeFromCart(idx)
                            }
                            className="text-slate-400 hover:text-red-400 px-2"
                          >
                            -
                          </button>
                          <span className="text-xs font-medium min-w-[1rem] text-center">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-6 border-t border-white/5 mt-4">
              <div className="flex justify-between text-lg font-bold mb-6">
                <span className="text-slate-300">
                  Tổng thanh toán:
                </span>
                <span className="text-indigo-400 text-2xl">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    handleNavigate("payment");
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Thanh toán bảo mật
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="bg-[#0f172a] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 border border-white/10 shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-2/5 bg-slate-800/30 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-48 h-48 object-contain mb-6 drop-shadow-2xl"
              />
              <h2 className="text-2xl font-bold text-center mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-slate-400 text-center text-sm">
                {selectedProduct.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-current" />
                {selectedProduct.rating} / 5.0
              </div>
            </div>

            <div className="md:w-3/5 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Tùy chỉnh gói
              </h3>

              <div className="mb-6">
                <label className="text-sm font-medium text-slate-400 mb-3 block flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Thời hạn
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "1 Tháng",
                    "3 Tháng",
                    "6 Tháng",
                    "12 Tháng"
                  ].map((d) => (
                    <button
                      key={d}
                      onClick={() => setModalDuration(d)}
                      className={`py-2 px-1 rounded-lg text-sm font-medium transition-all border ${
                        modalDuration === d
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-slate-400 mb-3 block flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Loại tài khoản
                </label>
                <div className="flex p-1 bg-slate-800 rounded-xl">
                  <button
                    onClick={() => setModalType("Upgrade")}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      modalType === "Upgrade"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Chính chủ (Nâng cấp)
                  </button>
                  <button
                    onClick={() => setModalType("Provided")}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      modalType === "Provided"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    Cấp sẵn (New)
                  </button>
                </div>
              </div>

              <div className="flex-1">
                {modalType === "Upgrade" ? (
                  <div>
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6">
                      <p className="text-xs text-indigo-300 mb-3 font-semibold flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" />
                        Thông tin tài khoản cần nâng cấp
                      </p>
                      <div className="space-y-3">
                        <input
                          type="email"
                          placeholder="Email đăng nhập..."
                          className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                          value={upgradeInfo.email}
                          onChange={(e) =>
                            setUpgradeInfo((prev) => ({
                              ...prev,
                              email: e.target.value
                            }))
                          }
                        />
                        <input
                          type="text"
                          placeholder="Mật khẩu..."
                          className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                          value={upgradeInfo.password}
                          onChange={(e) =>
                            setUpgradeInfo((prev) => ({
                              ...prev,
                              password: e.target.value
                            }))
                          }
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                          *Thông tin được mã hóa và chỉ dùng
                          để nâng cấp.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 rounded-xl p-6 text-center mb-6 border border-white/5">
                    <p className="text-sm text-slate-300 mb-4">
                      Với tài khoản cấp sẵn, bạn sẽ nhận được
                      thông tin đăng nhập ngay sau khi thanh
                      toán. Vui lòng liên hệ Zalo để nhận
                      account nhanh nhất.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-6 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400">
                    Tạm tính:
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {formatCurrency(currentModalPrice)}
                  </span>
                </div>

                <button
                  onClick={handleModalSubmit}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                    modalType === "Upgrade"
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-indigo-500/30 text-white"
                      : "bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/30 text-white"
                  }`}
                >
                  {modalType === "Upgrade" ? (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Thêm vào giỏ hàng
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Liên hệ Zalo mua ngay
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR ZOOM */}
      {zoomedQR && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setZoomedQR(null)}
        >
          <div
            className="bg-white p-4 rounded-3xl max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedQR(null)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-black hover:bg-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={zoomedQR}
              alt="QR Zoom"
              className="w-full h-auto rounded-xl"
            />
            <p className="text-center text-black font-bold mt-4">
              Quét mã để thanh toán
            </p>
          </div>
        </div>
      )}

      {/* PAYMENT VIEW */}
      {activeView === "payment" && (
        <div className="min-h-screen bg-[#0B1120] pb-20">
          <div className="max-w-7xl mx-auto px-4 py-8 flex items-center gap-4">
            <button
              onClick={() => handleNavigate("shop")}
              className="p-2 hover:bg-slate-800 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-slate-300" />
            </button>
            <h1 className="text-2xl font-bold text-white">
              Thanh toán & Xác nhận
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* left: bank + hướng dẫn */}
            <div className="space-y-8">
              <div className="bg-orange-500/10 border border-orange-500/50 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <ShieldCheck className="w-24 h-24 text-orange-500" />
                </div>
                <h3 className="text-orange-400 font-bold text-lg mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  CẢNH BÁO AN TOÀN
                </h3>
                <ul className="text-slate-300 text-sm space-y-2 list-disc pl-5 relative z-10">
                  <li>
                    Chỉ chuyển khoản vào các số tài khoản hiển
                    thị bên dưới.
                  </li>
                  <li>
                    Kiểm tra kỹ{" "}
                    <strong>Tên chủ tài khoản</strong> trước
                    khi gửi.
                  </li>
                  <li>
                    Không chuyển tiền cho bất kỳ ai nhắn tin
                    riêng yêu cầu chuyển khoản.
                  </li>
                  <li>
                    Ghi đúng nội dung chuyển khoản để đơn hàng
                    được xử lý tự động.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-400" />
                  Chọn tài khoản thanh toán
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BANK_ACCOUNTS.length > 0 ? (
                    BANK_ACCOUNTS.map((bank, idx) => {
                      const qrUrl =
                        bank.qrUrl ||
                        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${bank.stk}`;
                      const randomKey = `KEY ${Date.now()
                        .toString()
                        .slice(-6)}`;

                      return (
                        <div
                          key={idx}
                          className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 hover:border-indigo-500/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                              <span className="text-black font-bold text-xs">
                                {bank.bankName.substring(
                                  0,
                                  3
                                )}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-sm text-white">
                                {bank.bankName}
                              </p>
                              <p className="text-xs text-slate-400">
                                {bank.owner}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="bg-black/30 p-3 rounded-lg flex justify-between items-center group-hover:bg-black/50 transition-colors">
                              <div>
                                <p className="text-[10px] text-slate-500 uppercase">
                                  Số tài khoản
                                </p>
                                <p className="text-sm font-mono text-indigo-300 font-bold">
                                  {bank.stk}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    bank.stk
                                  );
                                  alert(
                                    `Đã sao chép STK: ${bank.stk}`
                                  );
                                }}
                                type="button"
                                className="text-slate-400 hover:text-white"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="bg-black/30 p-3 rounded-lg flex justify-between items-center group-hover:bg-black/50 transition-colors">
                              <div>
                                <p className="text-[10px] text-slate-500 uppercase">
                                  Nội dung chuyển khoản
                                </p>
                                <p className="text-sm font-mono text-white font-bold">
                                  {randomKey}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    randomKey
                                  );
                                  alert(
                                    "Đã sao chép nội dung"
                                  );
                                }}
                                type="button"
                                className="text-slate-400 hover:text-white"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-center relative group/qr">
                            <img
                              src={qrUrl}
                              alt="QR"
                              className="w-32 h-32 rounded-lg bg-white p-2"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setZoomedQR(qrUrl)
                              }
                              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover/qr:opacity-100 transition-all rounded-lg gap-2"
                            >
                              <ZoomIn className="w-8 h-8 text-white" />
                              <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full border border-white/20">
                                Phóng to
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-slate-400">
                      Đang cập nhật tài khoản ngân hàng...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* right: form */}
            <div className="bg-slate-800/30 border border-white/5 rounded-3xl p-6 lg:p-8 h-fit lg:sticky lg:top-24">
              {isOrderSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Đặt hàng thành công!
                  </h2>
                  <p className="text-slate-400 mb-8">
                    Đơn hàng của bạn đã được ghi nhận. Hệ
                    thống sẽ xử lý và gửi thông tin tài khoản
                    qua Zalo/Email trong vòng 5-15 phút sau khi
                    nhận được chuyển khoản.
                  </p>
                  <button
                    onClick={() => handleNavigate("shop")}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-white"
                  >
                    Quay lại trang chủ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit}>
                  <h3 className="text-xl font-bold text-white mb-6">
                    Thông tin đơn hàng
                  </h3>

                  <div className="space-y-4 mb-6 bg-black/20 p-4 rounded-xl">
                    {cart.length === 0 ? (
                      <p className="text-slate-400 text-sm">
                        Giỏ hàng trống
                      </p>
                    ) : (
                      cart.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0"
                        >
                          <div>
                            <span className="text-slate-300 block font-medium">
                              {item.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              x{item.quantity} •{" "}
                              {item.selectedDuration ||
                                "1 Tháng"}
                            </span>
                            {item.selectedType ===
                              "Upgrade" && (
                              <span className="text-[10px] text-indigo-400 block">
                                Nâng cấp chính chủ
                              </span>
                            )}
                          </div>
                          <span className="font-medium text-white">
                            {formatCurrency(
                              item.price * item.quantity
                            )}
                          </span>
                        </div>
                      ))
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10 mt-2">
                      <span>Tổng cộng</span>
                      <span className="text-indigo-400">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Tên của bạn
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-600"
                        placeholder="Nhập tên..."
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            name: e.target.value
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Số Zalo hoặc Email
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-600"
                        placeholder="Ví dụ: 0912345678"
                        value={customerInfo.contact}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            contact: e.target.value
                          }))
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={cart.length === 0}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 mt-4"
                    >
                      Xác nhận đã chuyển khoản
                    </button>
                    <p className="text-xs text-slate-500 text-center mt-2">
                      Vui lòng chuyển khoản trước khi bấm xác
                      nhận.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SHOP VIEW */}
      {activeView === "shop" && (
        <>
          {/* hero */}
          {activeCategory === "All" && !searchQuery && (
            <section className="relative py-16 lg:py-24 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 opacity-50" />
              <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10 opacity-30" />

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                  <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 text-xs font-bold mb-8 border border-red-500/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    Mùa Giáng Sinh - Sale Up To 50%
                  </span>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                    <span className="block text-white mb-2">
                      KACE STORE
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                      Nâng tầm trải nghiệm số
                    </span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto font-light px-4">
                    Sở hữu tài khoản Premium{" "}
                    <span className="text-white font-medium">
                      Netflix, Youtube, ChatGPT, Spotify
                    </span>{" "}
                    chính chủ. Bảo hành trọn đời, hỗ trợ 24/7,
                    tiết kiệm đến 70% chi phí.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                    <button
                      onClick={() =>
                        handleCategoryChange("BestSeller")
                      }
                      className="px-8 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-500 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-5 h-5 fill-white" />
                      Xem gói Hot Noel
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          "https://zalo.me/0916882278",
                          "_blank"
                        )
                      }
                      className="px-8 py-4 bg-[#0f172a] text-white font-bold rounded-2xl border border-slate-700 hover:bg-slate-800 hover:border-slate-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <div className="bg-blue-500 p-1 rounded-full">
                        <MessageCircle className="w-3 h-3 text-white" />
                      </div>
                      Tư vấn Zalo
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* stats */}
          {activeCategory === "All" && !searchQuery && (
            <section className="max-w-7xl mx-auto px-4 -mt-10 lg:-mt-16 mb-20">
              <StatsWidget />
            </section>
          )}

          {/* product section */}
          <main
            ref={mainSectionRef}
            className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full scroll-mt-24"
          >
            <div className="flex items-center gap-4 mb-8">
              <div
                className={`h-10 w-1.5 rounded-full ${
                  activeCategory === "BestSeller"
                    ? "bg-gradient-to-b from-yellow-500 to-orange-500"
                    : "bg-gradient-to-b from-indigo-500 to-purple-500"
                }`}
              />
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-bold ${
                    activeCategory === "BestSeller"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                >
                  {activeCategory === "All"
                    ? "Tất cả sản phẩm"
                    : CATEGORY_LABELS[activeCategory]}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Tìm thấy {filteredProducts.length} sản phẩm
                  phù hợp
                </p>
              </div>
            </div>

            {activeCategory === "BestSeller" &&
              featuredProduct && (
                <div className="mb-12 rounded-[2.5rem] p-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 shadow-2xl shadow-orange-500/20">
                  <div className="bg-[#111827] rounded-[2.3rem] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center relative z-10">
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                          <Star className="w-3 h-3 fill-current" />
                          Top 1 Bán Chạy Tháng Này
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                          {featuredProduct.name}
                        </h2>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20">
                            <span className="font-bold text-yellow-400 text-lg">
                              {featuredProduct.rating}
                            </span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i <
                                      Math.floor(
                                        featuredProduct.rating
                                      )
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-slate-600"
                                    }`}
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <span className="text-slate-400 border-l border-white/10 pl-4">
                            Hơn{" "}
                            <b>
                              {featuredProduct.soldCount}
                            </b>{" "}
                            lượt bán & đánh giá
                          </span>
                        </div>
                        <p className="text-lg text-slate-300 leading-relaxed">
                          {featuredProduct.description}{" "}
                          <br />
                          <span className="text-yellow-400 font-medium">
                            Bảo hành 1 đổi 1. Hỗ trợ 24/7.
                          </span>
                        </p>
                        <div className="flex items-end gap-4">
                          <div className="text-4xl font-bold text-white">
                            {formatCurrency(
                              featuredProduct.price
                            )}
                          </div>
                          <div className="text-xl text-slate-500 line-through mb-1.5">
                            {formatCurrency(
                              featuredProduct.originalPrice
                            )}
                          </div>
                          <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded-lg text-xs font-bold mb-2">
                            -
                            {(
                              100 -
                              (featuredProduct.price /
                                featuredProduct.originalPrice) *
                                100
                            ).toFixed(0)}
                            %
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            openProductModal(featuredProduct)
                          }
                          className="mt-4 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:-translate-y-1 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          Mua Ngay Giá Sốc
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="relative hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-orange-600 rounded-2xl blur-xl opacity-40" />
                        <img
                          src={featuredProduct.image}
                          alt={featuredProduct.name}
                          className="relative w-full aspect-square object-contain bg-[#1e293b] p-6 rounded-2xl shadow-2xl border border-white/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product) => {
                  if (
                    activeCategory === "BestSeller" &&
                    featuredProduct?.id === product.id
                  )
                    return null;

                  const isFav = favorites.includes(
                    product.id
                  );

                  return (
                    <div
                      key={product.id}
                      className="group bg-[#1e293b]/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:border-indigo-500/50 transition-all flex flex-col relative"
                    >
                      <button
                        onClick={(e) =>
                          toggleFavorite(product.id, e)
                        }
                        className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md ${
                          isFav
                            ? "bg-pink-500/20 text-pink-500"
                            : "bg-black/30 text-slate-400 hover:text-pink-400"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      <div className="relative aspect-square overflow-hidden bg-slate-800 p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.tags.includes(
                            "Best Seller"
                          ) && (
                            <span className="bg-yellow-400 text-black text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                              <Star className="w-3 h-3 fill-black" />
                              BEST SELLER
                            </span>
                          )}
                          {product.tags.includes(
                            "Hot Trend"
                          ) && (
                            <span className="bg-orange-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg animate-pulse flex items-center gap-1">
                              <Flame className="w-3 h-3 fill-white" />
                              HOT
                            </span>
                          )}
                          {product.tags.includes(
                            "Sale Sốc"
                          ) && (
                            <span className="bg-red-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg">
                              SALE SỐC
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                          <div className="flex gap-2 flex-wrap">
                            <span className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs font-medium text-indigo-300 flex items-center gap-1">
                              {getCategoryIcon(
                                product.category
                              )}
                              {CATEGORY_LABELS[
                                product.category
                              ] || product.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-indigo-400 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                          {product.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-white/5">
                          <div className="flex justify-between items-end mb-4">
                            <div>
                              <span className="text-xs text-slate-500 line-through">
                                {formatCurrency(
                                  product.originalPrice
                                )}
                              </span>
                              <span className="block text-xl font-bold text-indigo-400">
                                {formatCurrency(
                                  product.price
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded-lg">
                              <Star className="w-3 h-3 fill-yellow-400" />
                              {product.rating}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                openProductModal(product)
                              }
                              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                            >
                              <Eye className="w-4 h-4" />
                              Xem chi tiết
                            </button>
                            <button
                              onClick={() => addToCart(product)}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 bg-slate-800/30 rounded-3xl border border-white/5 border-dashed">
                <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Thử tìm kiếm với từ khóa khác hoặc xem danh
                  mục "Tất cả" để khám phá thêm.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 text-indigo-400 hover:underline font-medium"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </main>

          {/* why us */}
          {activeCategory === "All" && !searchQuery && (
            <section className="py-20 bg-slate-900/30 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">
                    Tại sao chọn KACE STORE?
                  </h2>
                  <p className="text-slate-400">
                    Cam kết chất lượng dịch vụ hàng đầu Việt
                    Nam
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {FEATURES.map((f) => (
                    <div
                      key={f.id}
                      className="bg-[#0B1120] p-6 rounded-2xl border border-white/5 hover:border-indigo-500/50 transition-all hover:-translate-y-2"
                    >
                      <div className="mb-4 bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center">
                        {getFeatureIcon(f.icon)}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {f.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {f.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* reviews */}
          {activeCategory === "All" && !searchQuery && (
            <section className="py-20 bg-gradient-to-b from-[#0B1120] to-indigo-950/20 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Khách hàng nói gì về chúng tôi?
                  </h2>
                  <p className="text-slate-400">
                    Niềm tin của khách hàng là động lực phát
                    triển
                  </p>
                </div>
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visibleReviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 relative"
                      >
                        <div className="absolute top-8 right-8 text-indigo-500/20">
                          <MessageCircle className="w-12 h-12 rotate-180" />
                        </div>
                        <div className="flex gap-1 mb-6">
                          {Array.from({
                            length: review.rating
                          }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-slate-300 mb-8 leading-relaxed italic h-20 overflow-hidden">
                          "{review.comment}"
                        </p>
                        <div className="flex items-center gap-4">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-12 h-12 rounded-full ring-2 ring-indigo-500/30"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-white">
                              {review.user}
                            </h4>
                            <p className="text-xs text-indigo-400 mt-0.5">
                              Đã mua {review.productName}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleReviewNav("prev")}
                    className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 p-3 rounded-full bg-slate-800 text-white hover:bg-indigo-600 shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleReviewNav("next")}
                    className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-3 rounded-full bg-slate-800 text-white hover:bg-indigo-600 shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* GUIDE VIEW */}
      {activeView === "guide" && (
        <div className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh]">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-indigo-500/10 rounded-2xl mb-4">
              <HelpCircle className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Hướng dẫn & Câu hỏi thường gặp
            </h1>
            <p className="text-slate-400">
              Mọi thông tin bạn cần để bắt đầu sử dụng dịch vụ
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-400" />
              Hướng dẫn mua hàng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                  1
                </span>
                <h4 className="font-bold text-lg mb-2 mt-2">
                  Chọn sản phẩm
                </h4>
                <p className="text-slate-400 text-sm">
                  Tìm kiếm gói tài khoản bạn cần và thêm vào
                  giỏ hàng.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                  2
                </span>
                <h4 className="font-bold text-lg mb-2 mt-2">
                  Thanh toán
                </h4>
                <p className="text-slate-400 text-sm">
                  Điền thông tin liên hệ và chuyển khoản qua
                  QR/banking.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                  3
                </span>
                <h4 className="font-bold text-lg mb-2 mt-2">
                  Nhận tài khoản
                </h4>
                <p className="text-slate-400 text-sm">
                  Hệ thống gửi thông tin tài khoản qua
                  Zalo/Email trong 5–15 phút.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-indigo-400" />
              Câu hỏi thường gặp
            </h3>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#1e293b]/50 border border-white/5 rounded-2xl overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-lg text-slate-200 hover:text-indigo-400">
                      <span>{faq.question}</span>
                      <span className="transition-transform group-open:rotate-180 bg-slate-800 p-1 rounded-full">
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-base leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POLICY VIEW */}
      {activeView === "policy" && (
        <div className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh]">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-indigo-500/10 rounded-2xl mb-4">
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Chính sách & Điều khoản
            </h1>
            <p className="text-slate-400">
              Quyền lợi của bạn luôn được đặt lên hàng đầu
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-slate-800/30 p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <RefreshCw className="w-6 h-6 text-indigo-400" />
                Chính sách bảo hành
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>
                  Bảo hành 1 đổi 1 trong suốt thời gian sử
                  dụng nếu lỗi từ hệ thống.
                </li>
                <li>
                  Xử lý yêu cầu bảo hành trong vòng 24h làm
                  việc (thường 30–60 phút).
                </li>
                <li>
                  Không tự ý đổi mật khẩu / email với gói dùng
                  chung, tuân thủ đúng quy định sử dụng.
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/30 p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <CreditCard className="w-6 h-6 text-indigo-400" />
                Chính sách hoàn tiền
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>
                  Hoàn tiền nếu sản phẩm lỗi và không thể xử
                  lý / thay thế trong 72h.
                </li>
                <li>
                  Hoàn tiền khi khách hủy đơn trước khi tiến
                  hành nâng cấp / cấp tài khoản.
                </li>
                <li>
                  Không hoàn tiền khi đã nhận tài khoản thành
                  công nhưng đổi ý / không còn nhu cầu.
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/30 p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <AlertCircle className="w-6 h-6 text-indigo-400" />
                Điều khoản sử dụng
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>
                  Người dùng có trách nhiệm bảo mật thông tin
                  tài khoản.
                </li>
                <li>
                  Không chia sẻ công khai hoặc bán lại tài
                  khoản khi chưa được phép.
                </li>
                <li>
                  Đối với tài khoản Shared, chỉ dùng đúng
                  profile được cấp.
                </li>
                <li>
                  Chúng tôi có quyền ngưng bảo hành nếu phát
                  hiện vi phạm nghiêm trọng.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        ref={footerRef}
        className="bg-[#0f172a] border-t border-white/10 pt-20 pb-10 mt-auto"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://via.placeholder.com/200x60/transparent/FFFFFF?text=KACE+STORE"
                alt="KACE STORE"
                className="h-8 object-contain"
              />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              KACE STORE - Chuyên cung cấp tài khoản Premium
              uy tín. Hơn 50,000 khách hàng tin dùng với dịch
              vụ bảo hành trọn đời.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-[#1877F2]"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-[#0068FF]"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-red-500"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">
              Liên hệ nhanh
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Phone className="w-4 h-4 text-indigo-400" />
                </div>
                <span>Hotline: 0916 882 278</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <MessageCircle className="w-4 h-4 text-indigo-400" />
                </div>
                <span>Zalo: 0916 882 278</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <span>support@kacestore.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">
              Thông tin
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNavigate("guide")}
                  className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block text-left"
                >
                  Hướng dẫn & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("policy")}
                  className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block text-left"
                >
                  Chính sách & Điều khoản
                </button>
              </li>
              <li className="h-px bg-white/5 my-2" />
              <li>
                <button
                  onClick={() =>
                    handleCategoryChange("BestSeller")
                  }
                  className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block text-yellow-500 font-bold"
                >
                  Top Bán Chạy 🔥
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">
              Thanh toán
            </h4>
            <div
              onClick={() => handleNavigate("payment")}
              className="flex flex-wrap gap-2 mb-6 cursor-pointer"
            >
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold">
                MOMO
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold">
                ZALO PAY
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold">
                VISA/MASTER
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold">
                BANKING
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Thanh toán an toàn, tự động 24/7
            </p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-slate-500 text-sm mb-2">
            &copy; 2024 KACE STORE. All rights reserved.
          </p>
        </div>
      </footer>

      {/* AI CHATBOT */}
      <AIChat />
    </div>
  );
};

export default App;
