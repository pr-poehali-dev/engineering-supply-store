import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number | null;
  unit: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isHit: boolean;
  img: string;
}

const HERO_IMG = "https://cdn.poehali.dev/projects/5d87c0e3-abd3-43fd-b4fa-16f5a24633ab/files/f4f187c2-a45b-452e-a75d-57c9dfa92517.jpg";
const VENT_IMG = "https://cdn.poehali.dev/projects/5d87c0e3-abd3-43fd-b4fa-16f5a24633ab/files/78343728-c0e8-49ab-bb88-8cb988ebb892.jpg";
const METIZ_IMG = "https://cdn.poehali.dev/projects/5d87c0e3-abd3-43fd-b4fa-16f5a24633ab/files/3e2e6678-1e18-44a8-89ea-f24330cb4a6c.jpg";

const SECTIONS = ["Главная", "О компании", "Каталог", "Услуги", "Доставка", "Контакты"];

const CATEGORIES = [
  { id: "plumbing", label: "Сантехника", icon: "Droplets", count: 1240 },
  { id: "metiz", label: "Метизы", icon: "Cog", count: 3800 },
  { id: "ventilation", label: "Вентиляция", icon: "Wind", count: 560 },
  { id: "chemistry", label: "Химия", icon: "FlaskConical", count: 320 },
  { id: "fittings", label: "Фитинги", icon: "Layers", count: 980 },
  { id: "valves", label: "Арматура", icon: "Gauge", count: 740 },
];

const BRANDS = ["Valtec", "Wester", "Rehau", "Rifeng", "Giacomini", "Danfoss", "Grundfos", "Viega"];

const PRODUCTS = [
  { id: 1, name: "Труба полипропиленовая PN25 32мм", brand: "Valtec", category: "plumbing", price: 87, oldPrice: 110, unit: "м.п.", rating: 4.8, reviews: 124, inStock: true, isHit: true, img: HERO_IMG },
  { id: 2, name: "Болт М12×80 DIN 931 оц.", brand: "Wester", category: "metiz", price: 12, oldPrice: null, unit: "шт", rating: 4.6, reviews: 89, inStock: true, isHit: false, img: METIZ_IMG },
  { id: 3, name: "Вентилятор канальный ВКП 160/4Е", brand: "Grundfos", category: "ventilation", price: 4200, oldPrice: 5100, unit: "шт", rating: 4.9, reviews: 56, inStock: true, isHit: true, img: VENT_IMG },
  { id: 4, name: "Кран шаровой полнопроходной 1\"", brand: "Giacomini", category: "plumbing", price: 380, oldPrice: null, unit: "шт", rating: 4.7, reviews: 203, inStock: true, isHit: false, img: HERO_IMG },
  { id: 5, name: "Гайка М8 DIN 934 нержавейка", brand: "Wester", category: "metiz", price: 6, oldPrice: null, unit: "шт", rating: 4.5, reviews: 45, inStock: false, isHit: false, img: METIZ_IMG },
  { id: 6, name: "Воздуховод круглый оцинк. d200 L=3м", brand: "Valtec", category: "ventilation", price: 1850, oldPrice: 2100, unit: "шт", rating: 4.8, reviews: 78, inStock: true, isHit: false, img: VENT_IMG },
  { id: 7, name: "Фитинг пресс угол 16×16", brand: "Rehau", category: "fittings", price: 145, oldPrice: null, unit: "шт", rating: 4.9, reviews: 167, inStock: true, isHit: true, img: HERO_IMG },
  { id: 8, name: "Клей-герметик сантехнический 310мл", brand: "Danfoss", category: "chemistry", price: 320, oldPrice: 390, unit: "шт", rating: 4.6, reviews: 91, inStock: true, isHit: false, img: METIZ_IMG },
  { id: 9, name: "Счётчик холодной воды Ду20", brand: "Danfoss", category: "plumbing", price: 1240, oldPrice: null, unit: "шт", rating: 4.7, reviews: 312, inStock: true, isHit: true, img: HERO_IMG },
  { id: 10, name: "Шуруп саморез 5×50 (200шт)", brand: "Wester", category: "metiz", price: 180, oldPrice: 210, unit: "уп", rating: 4.4, reviews: 67, inStock: true, isHit: false, img: METIZ_IMG },
  { id: 11, name: "Решётка вентиляционная 200×200", brand: "Rifeng", category: "ventilation", price: 240, oldPrice: null, unit: "шт", rating: 4.5, reviews: 33, inStock: true, isHit: false, img: VENT_IMG },
  { id: 12, name: "Фум-лента 12мм×12м", brand: "Viega", category: "chemistry", price: 28, oldPrice: null, unit: "шт", rating: 4.8, reviews: 445, inStock: true, isHit: true, img: METIZ_IMG },
];

const SERVICES = [
  { icon: "Wrench", title: "Монтаж систем", desc: "Профессиональный монтаж сантехнических и вентиляционных систем под ключ" },
  { icon: "FileSearch", title: "Технический подбор", desc: "Бесплатная консультация инженера по подбору оборудования для вашего объекта" },
  { icon: "Truck", title: "Доставка на объект", desc: "Доставка по городу и области с разгрузкой и занесением на этаж" },
  { icon: "ClipboardList", title: "Комплектация объектов", desc: "Полная комплектация строительных объектов любой сложности по ТЗ заказчика" },
];

const DELIVERY_ZONES = [
  { zone: "В пределах МКАД", time: "1-2 дня", price: "от 500 ₽", free: "от 15 000 ₽" },
  { zone: "МО до 50 км", time: "2-3 дня", price: "от 900 ₽", free: "от 30 000 ₽" },
  { zone: "МО до 100 км", time: "3-4 дня", price: "от 1500 ₽", free: "от 50 000 ₽" },
  { zone: "Регионы РФ", time: "4-7 дней", price: "от 2000 ₽", free: "от 80 000 ₽" },
];

function ProductCard({ product, onAdd, added }: { product: Product; onAdd: (id: number) => void; added: boolean }) {
  return (
    <div className="product-card bg-card border border-border rounded-xl overflow-hidden group">
      <div className="relative h-44 overflow-hidden bg-secondary">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        {product.isHit && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md">ХИТ</div>
        )}
        {product.oldPrice && (
          <div className="absolute top-3 right-3 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="bg-card border border-border text-muted-foreground text-xs px-3 py-1.5 rounded-full">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-primary font-medium mb-1">{product.brand}</div>
        <h3 className="text-sm font-medium text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-muted-foreground/30"}`}>★</span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-oswald text-xl font-bold text-foreground">{product.price.toLocaleString()} ₽</span>
              <span className="text-xs text-muted-foreground">/{product.unit}</span>
            </div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</div>
            )}
          </div>
          <button
            onClick={() => onAdd(product.id)}
            disabled={!product.inStock}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              added
                ? "bg-green-500 text-white"
                : product.inStock
                  ? "bg-primary hover:bg-primary/90 text-white hover:shadow-md hover:shadow-primary/30"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Icon name={added ? "Check" : "ShoppingCart"} size={16} />
          </button>
        </div>
        {product.inStock && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <span className="text-xs text-green-400">В наличии</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("popular");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const filteredProducts = PRODUCTS
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchStock = !onlyInStock || p.inStock;
      return matchSearch && matchCat && matchBrand && matchPrice && matchStock;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const navTo = (section: string) => {
    setActiveSection(section);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 border-b border-border/50 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Icon name="Phone" size={14} className="text-primary" />
                +7 (495) 123-45-67
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Icon name="Clock" size={14} className="text-primary" />
                Пн-Пт 9:00–18:00
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-1.5">
                <Icon name="MapPin" size={14} className="text-primary" />
                Москва, Промышленная ул., 12
              </span>
              <button className="text-primary hover:text-primary/80 transition-colors">Личный кабинет</button>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <button onClick={() => navTo("Главная")} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-white" />
              </div>
              <div>
                <span className="font-oswald text-xl font-bold tracking-wide text-foreground">ТЕХНО<span className="text-primary">СНАБ</span></span>
                <div className="text-[10px] text-muted-foreground tracking-widest uppercase -mt-0.5">Инженерные системы</div>
              </div>
            </button>

            <div className="hidden md:flex flex-1 max-w-lg mx-6 relative">
              <input
                type="text"
                placeholder="Поиск по названию, артикулу, бренду..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); if (e.target.value) navTo("Каталог"); }}
                className="w-full bg-secondary border border-border rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Search" size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => navTo("Каталог")}>
                <Icon name="ShoppingCart" size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <Icon name={mobileMenu ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 pb-2">
            {SECTIONS.map(s => (
              <button
                key={s}
                onClick={() => navTo(s)}
                className={`nav-link px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  activeSection === s ? "text-primary active" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col gap-1">
                {SECTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => navTo(s)}
                    className={`text-left px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                      activeSection === s ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); if (e.target.value) navTo("Каталог"); }}
                  className="w-full bg-secondary border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
                <Icon name="Search" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-[120px] md:pt-[136px]">

        {/* ===== ГЛАВНАЯ ===== */}
        {activeSection === "Главная" && (
          <>
            <section className="relative overflow-hidden noise-overlay">
              <div className="absolute inset-0">
                <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 right-10 w-64 h-64 border border-primary rotate-45" />
                <div className="absolute top-20 right-20 w-48 h-48 border border-primary rotate-45" />
                <div className="absolute bottom-20 right-40 w-32 h-32 border border-primary rotate-45" />
              </div>
              <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-6 animate-fade-in-up">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Более 6000 позиций в наличии
                  </div>
                  <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none tracking-tight text-foreground mb-4 animate-fade-in-up delay-100">
                    ИНЖЕНЕРНЫЕ<br />
                    <span className="text-primary">СИСТЕМЫ</span><br />
                    ПОД КЛЮЧ
                  </h1>
                  <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up delay-200">
                    Сантехника, метизы, вентиляция и химия от ведущих производителей.<br />
                    Оптовые цены. Быстрая доставка. Технический подбор.
                  </p>
                  <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
                    <button
                      onClick={() => navTo("Каталог")}
                      className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 flex items-center gap-2"
                    >
                      <Icon name="LayoutGrid" size={18} />
                      Перейти в каталог
                    </button>
                    <button
                      onClick={() => navTo("Контакты")}
                      className="bg-secondary hover:bg-secondary/80 text-foreground font-semibold px-8 py-3.5 rounded-lg border border-border transition-all duration-200 flex items-center gap-2"
                    >
                      <Icon name="Phone" size={18} />
                      Запросить КП
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-y border-border bg-card">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
                  {[
                    { num: "6 000+", label: "Позиций в каталоге", icon: "Package" },
                    { num: "15 лет", label: "На рынке", icon: "Award" },
                    { num: "3 500+", label: "Клиентов", icon: "Users" },
                    { num: "24ч", label: "Отгрузка со склада", icon: "Zap" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center py-6 px-4 gap-1 text-center">
                      <Icon name={s.icon} size={20} className="text-primary mb-1" />
                      <span className="font-oswald text-2xl md:text-3xl font-bold text-foreground">{s.num}</span>
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="text-primary text-sm font-medium mb-1 tracking-widest uppercase">Ассортимент</div>
                    <h2 className="font-oswald text-3xl md:text-4xl font-bold text-foreground">Категории товаров</h2>
                  </div>
                  <button onClick={() => navTo("Каталог")} className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
                    Весь каталог <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {CATEGORIES.map((cat, i) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); navTo("Каталог"); }}
                      className="group bg-card border border-border hover:border-primary/40 rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:bg-primary/5 animate-fade-in-up"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div className="w-12 h-12 bg-secondary group-hover:bg-primary/10 rounded-xl flex items-center justify-center transition-colors">
                        <Icon name={cat.icon} size={22} className="text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{cat.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{cat.count.toLocaleString()} позиций</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16 bg-card/50">
              <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="text-primary text-sm font-medium mb-1 tracking-widest uppercase">Популярное</div>
                    <h2 className="font-oswald text-3xl md:text-4xl font-bold text-foreground">Хиты продаж</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {PRODUCTS.filter(p => p.isHit).slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} onAdd={addToCart} added={addedToCart === product.id} />
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <div className="text-primary text-sm font-medium mb-1 tracking-widest uppercase">Преимущества</div>
                  <h2 className="font-oswald text-3xl md:text-4xl font-bold text-foreground">Почему выбирают нас</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: "ShieldCheck", title: "Оригинальная продукция", desc: "Только сертифицированные товары от официальных дилеров" },
                    { icon: "TrendingDown", title: "Оптовые цены", desc: "Прямые поставки позволяют предлагать минимальные цены" },
                    { icon: "Headphones", title: "Техподдержка", desc: "Инженеры-консультанты помогут с подбором оборудования" },
                    { icon: "RotateCcw", title: "Возврат 30 дней", desc: "Обмен или возврат товара в течение 30 дней без вопросов" },
                  ].map((item, i) => (
                    <div key={i} className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon name={item.icon} size={22} className="text-primary" />
                      </div>
                      <h3 className="font-oswald text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="relative overflow-hidden bg-primary rounded-2xl p-8 md:p-12">
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10">
                    <img src={VENT_IMG} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent rounded-2xl" />
                  <div className="relative z-10 max-w-xl">
                    <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-3">
                      Нужна комплектация объекта?
                    </h2>
                    <p className="text-white/80 mb-6 text-lg">
                      Оставьте заявку — наш инженер свяжется в течение 30 минут и подберёт всё необходимое по вашему ТЗ.
                    </p>
                    <button
                      onClick={() => navTo("Контакты")}
                      className="bg-white text-primary font-bold px-8 py-3.5 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
                    >
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===== О КОМПАНИИ ===== */}
        {activeSection === "О компании" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-primary text-sm font-medium mb-2 tracking-widest uppercase">О нас</div>
              <h1 className="font-oswald text-4xl md:text-5xl font-bold mb-12">О КОМПАНИИ</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    <strong className="text-foreground">ТехноСнаб</strong> — один из ведущих поставщиков инженерных систем и материалов в России. С 2010 года мы обеспечиваем строительные компании, монтажные организации и частных мастеров качественной продукцией ведущих мировых и российских производителей.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Наш склад площадью более 5 000 м² позволяет держать в постоянном наличии свыше 6 000 позиций. Собственный автопарк обеспечивает оперативную доставку по Москве, МО и всей России.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы работаем как с крупным оптом, так и с розничными покупателями. Для постоянных клиентов действует гибкая система скидок и индивидуальные условия.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { num: "15", label: "лет на рынке" },
                      { num: "6 000+", label: "позиций" },
                      { num: "3 500+", label: "клиентов" },
                      { num: "5 000", label: "м² склада" },
                    ].map((s, i) => (
                      <div key={i} className="bg-card border border-border rounded-xl p-4">
                        <div className="font-oswald text-3xl font-bold text-primary">{s.num}</div>
                        <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <img src={HERO_IMG} alt="О компании" className="w-full h-80 object-cover rounded-2xl opacity-80" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
                  <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Icon name="Building2" size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Официальный дилер</div>
                        <div className="text-xs text-muted-foreground">Valtec, Rehau, Grundfos, Danfoss</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="font-oswald text-3xl font-bold mb-8">Наши специалисты</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                  { name: "Алексей Петров", role: "Руководитель продаж", exp: "12 лет опыта" },
                  { name: "Мария Иванова", role: "Инженер-консультант", exp: "8 лет опыта" },
                  { name: "Дмитрий Козлов", role: "Ведущий менеджер", exp: "10 лет опыта" },
                  { name: "Анна Соколова", role: "Технический эксперт", exp: "7 лет опыта" },
                ].map((m, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="User" size={28} className="text-primary" />
                    </div>
                    <div className="font-semibold text-foreground">{m.name}</div>
                    <div className="text-sm text-primary mt-1">{m.role}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.exp}</div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-3">
                  <Icon name="Award" size={24} className="text-primary" />
                  Сертификаты и лицензии
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Сертификат ISO 9001:2015", "Дилерский договор Valtec", "Дилерский договор Grundfos", "Свидетельство СРО", "Дилерский договор Rehau", "Пожарная сертификация"].map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                      <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== КАТАЛОГ ===== */}
        {activeSection === "Каталог" && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-oswald text-3xl md:text-4xl font-bold text-foreground">КАТАЛОГ</h1>
                  <p className="text-muted-foreground text-sm mt-1">{filteredProducts.length} позиций</p>
                </div>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors lg:hidden"
                >
                  <Icon name="SlidersHorizontal" size={16} />
                  Фильтры
                  {(selectedBrands.length > 0 || selectedCategory !== "all" || onlyInStock) && (
                    <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {selectedBrands.length + (selectedCategory !== "all" ? 1 : 0) + (onlyInStock ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex gap-6">
                <aside className={`${filterOpen ? "block" : "hidden"} lg:block w-full lg:w-64 flex-shrink-0`}>
                  <div className="bg-card border border-border rounded-xl p-5 sticky top-40">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Фильтры</h3>
                      <button
                        onClick={() => { setSelectedCategory("all"); setSelectedBrands([]); setOnlyInStock(false); setPriceRange([0, 10000]); setSearchQuery(""); }}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Сбросить
                      </button>
                    </div>

                    <div className="relative mb-5">
                      <input
                        type="text"
                        placeholder="Поиск..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-secondary border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                      <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="mb-5">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">Категория</div>
                      <div className="space-y-1">
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === "all" ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"}`}
                        >
                          Все категории
                        </button>
                        {CATEGORIES.map(c => (
                          <button
                            key={c.id}
                            onClick={() => setSelectedCategory(c.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${selectedCategory === c.id ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"}`}
                          >
                            <span className="flex items-center gap-2">
                              <Icon name={c.icon} size={14} />
                              {c.label}
                            </span>
                            <span className="text-xs opacity-60">{c.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">Цена, ₽</div>
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                          className="w-full bg-secondary border border-border rounded px-2 py-1.5 text-sm focus:outline-none focus:border-primary text-foreground"
                          placeholder="от"
                        />
                        <span className="text-muted-foreground">—</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                          className="w-full bg-secondary border border-border rounded px-2 py-1.5 text-sm focus:outline-none focus:border-primary text-foreground"
                          placeholder="до"
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10000}
                        value={priceRange[1]}
                        onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                        className="w-full"
                      />
                    </div>

                    <div className="mb-5">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">Бренд</div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {BRANDS.map(brand => (
                          <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                            <div
                              onClick={() => toggleBrand(brand)}
                              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                                selectedBrands.includes(brand) ? "bg-primary border-primary" : "border-border group-hover:border-primary/60"
                              }`}
                            >
                              {selectedBrands.includes(brand) && <Icon name="Check" size={10} className="text-white" />}
                            </div>
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        onClick={() => setOnlyInStock(!onlyInStock)}
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                          onlyInStock ? "bg-primary border-primary" : "border-border group-hover:border-primary/60"
                        }`}
                      >
                        {onlyInStock && <Icon name="Check" size={10} className="text-white" />}
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Только в наличии</span>
                    </label>
                  </div>
                </aside>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-5 bg-card border border-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted-foreground mr-2 whitespace-nowrap">Сортировка:</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { v: "popular", l: "Популярные" },
                        { v: "price-asc", l: "Дешевле" },
                        { v: "price-desc", l: "Дороже" },
                        { v: "rating", l: "По рейтингу" },
                      ].map(s => (
                        <button
                          key={s.v}
                          onClick={() => setSortBy(s.v)}
                          className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                            sortBy === s.v ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {s.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                      <Icon name="SearchX" size={48} className="text-muted-foreground/40 mx-auto mb-4" />
                      <div className="text-muted-foreground">Ничего не найдено</div>
                      <button
                        onClick={() => { setSelectedCategory("all"); setSelectedBrands([]); setOnlyInStock(false); setSearchQuery(""); }}
                        className="mt-4 text-primary hover:text-primary/80 text-sm"
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAdd={addToCart} added={addedToCart === product.id} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== УСЛУГИ ===== */}
        {activeSection === "Услуги" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-primary text-sm font-medium mb-2 tracking-widest uppercase">Что мы делаем</div>
              <h1 className="font-oswald text-4xl md:text-5xl font-bold mb-12">НАШИ УСЛУГИ</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {SERVICES.map((s, i) => (
                  <div key={i} className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon name={s.icon} size={26} className="text-primary" />
                    </div>
                    <h3 className="font-oswald text-2xl font-bold text-foreground mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    <button
                      onClick={() => navTo("Контакты")}
                      className="mt-6 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      Узнать подробнее <Icon name="ArrowRight" size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <h2 className="font-oswald text-3xl font-bold mb-10 text-center">Как мы работаем</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { num: "01", title: "Заявка", desc: "Оставляете заявку на сайте или звоните" },
                    { num: "02", title: "Подбор", desc: "Инженер подбирает оптимальные решения" },
                    { num: "03", title: "КП", desc: "Получаете коммерческое предложение" },
                    { num: "04", title: "Поставка", desc: "Отгружаем товар в согласованные сроки" },
                  ].map((step, i) => (
                    <div key={i} className="relative flex flex-col items-center text-center">
                      {i < 3 && (
                        <div className="hidden md:block absolute top-6 left-[60%] right-0 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                      )}
                      <div className="w-12 h-12 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center mb-4 relative z-10">
                        <span className="font-oswald font-bold text-primary text-lg">{step.num}</span>
                      </div>
                      <h4 className="font-oswald font-bold text-lg mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => navTo("Контакты")}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 text-lg"
                >
                  Заказать услугу
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ===== ДОСТАВКА ===== */}
        {activeSection === "Доставка" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-primary text-sm font-medium mb-2 tracking-widest uppercase">Логистика</div>
              <h1 className="font-oswald text-4xl md:text-5xl font-bold mb-12">ДОСТАВКА И ОПЛАТА</h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-3">
                    <Icon name="Truck" size={22} className="text-primary" />
                    Способы доставки
                  </h2>
                  <div className="space-y-4">
                    {[
                      { icon: "Car", title: "Курьерская доставка", desc: "Собственный автопарк, доставка до двери" },
                      { icon: "Building", title: "Самовывоз со склада", desc: "Москва, Промышленная ул., 12 — ежедневно" },
                      { icon: "Package", title: "Транспортные компании", desc: "СДЭК, Деловые Линии, ПЭК и другие ТК" },
                      { icon: "Train", title: "Ж/Д и авиадоставка", desc: "По согласованию для крупных объектов" },
                    ].map((d, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl">
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={d.icon} size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">{d.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{d.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-3">
                    <Icon name="CreditCard" size={22} className="text-primary" />
                    Способы оплаты
                  </h2>
                  <div className="space-y-4">
                    {[
                      { icon: "Receipt", title: "Безналичный расчёт", desc: "Для юридических лиц, счёт + договор" },
                      { icon: "Wallet", title: "Наличные", desc: "При самовывозе или курьером" },
                      { icon: "CreditCard", title: "Банковская карта", desc: "Visa, Mastercard, Мир" },
                      { icon: "Building2", title: "Отсрочка платежа", desc: "Для постоянных клиентов — до 30 дней" },
                    ].map((p, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl">
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={p.icon} size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">{p.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
                <div className="p-6 border-b border-border">
                  <h2 className="font-oswald text-2xl font-bold flex items-center gap-3">
                    <Icon name="MapPin" size={22} className="text-primary" />
                    Тарифы по зонам
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Зона</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Срок</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Стоимость</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Бесплатно от</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DELIVERY_ZONES.map((z, i) => (
                        <tr key={i} className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${i % 2 === 0 ? "" : "bg-secondary/10"}`}>
                          <td className="p-4 font-medium text-sm text-foreground">{z.zone}</td>
                          <td className="p-4 text-sm text-muted-foreground">{z.time}</td>
                          <td className="p-4 text-sm text-primary font-medium">{z.price}</td>
                          <td className="p-4 text-sm text-green-400 font-medium">{z.free}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
                <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Стоимость и сроки доставки рассчитываются индивидуально для крупных заказов и нестандартных грузов. Свяжитесь с менеджером для уточнения условий.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ===== КОНТАКТЫ ===== */}
        {activeSection === "Контакты" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-primary text-sm font-medium mb-2 tracking-widest uppercase">Связь</div>
              <h1 className="font-oswald text-4xl md:text-5xl font-bold mb-12">КОНТАКТЫ</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[
                    { icon: "MapPin", title: "Адрес", lines: ["г. Москва, ул. Промышленная, 12", "Склад: открыт Пн–Пт 8:00–19:00, Сб 9:00–15:00"] },
                    { icon: "Phone", title: "Телефоны", lines: ["+7 (495) 123-45-67 — отдел продаж", "+7 (495) 123-45-68 — технический отдел"] },
                    { icon: "Mail", title: "Email", lines: ["sales@tehnosnab.ru — продажи", "info@tehnosnab.ru — общие вопросы"] },
                    { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 9:00 – 18:00", "Сб–Вс: выходной (срочные вопросы — по WhatsApp)"] },
                  ].map((c, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon} size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground mb-1">{c.title}</div>
                        {c.lines.map((l, j) => <div key={j} className="text-sm text-muted-foreground">{l}</div>)}
                      </div>
                    </div>
                  ))}
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="text-sm font-semibold text-foreground mb-3">Мессенджеры и соцсети</div>
                    <div className="flex gap-3">
                      {["WhatsApp", "Telegram", "ВКонтакте"].map(m => (
                        <button key={m} className="bg-secondary hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 px-4 py-2 rounded-lg text-sm transition-all text-foreground">
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="font-oswald text-2xl font-bold mb-2">Отправить заявку</h2>
                  <p className="text-sm text-muted-foreground mb-6">Ответим в течение 30 минут в рабочее время</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Имя *</label>
                        <input type="text" placeholder="Иван Иванов" className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Телефон *</label>
                        <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                      <input type="email" placeholder="mail@company.ru" className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Компания</label>
                      <input type="text" placeholder="ООО «Название»" className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Тема обращения</label>
                      <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground">
                        <option>Коммерческое предложение</option>
                        <option>Технический подбор</option>
                        <option>Комплектация объекта</option>
                        <option>Рекламация</option>
                        <option>Сотрудничество</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                      <textarea placeholder="Опишите ваш запрос..." rows={4} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none text-foreground placeholder:text-muted-foreground" />
                    </div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2">
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                  <Icon name="Zap" size={14} className="text-white" />
                </div>
                <span className="font-oswald text-lg font-bold text-foreground">ТЕХНО<span className="text-primary">СНАБ</span></span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Поставщик инженерных систем и материалов с 2010 года. Работаем для профессионалов.
              </p>
            </div>
            {[
              { title: "Каталог", links: ["Сантехника", "Метизы", "Вентиляция", "Химия", "Фитинги", "Арматура"] },
              { title: "Компания", links: ["О нас", "Сертификаты", "Вакансии", "Новости", "Партнёрам"] },
              { title: "Поддержка", links: ["Доставка", "Оплата", "Возврат", "Гарантия", "Контакты"] },
            ].map((col, i) => (
              <div key={i}>
                <div className="font-semibold text-sm text-foreground mb-3">{col.title}</div>
                <div className="space-y-2">
                  {col.links.map(link => (
                    <button key={link} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{link}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2024 ТехноСнаб. Все права защищены.</p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <button className="hover:text-primary transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-primary transition-colors">Оферта</button>
            </div>
          </div>
        </div>
      </footer>

      {addedToCart && (
        <div className="fixed bottom-6 right-6 bg-primary text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up z-50">
          <Icon name="ShoppingCart" size={18} />
          <span className="text-sm font-medium">Товар добавлен в корзину</span>
        </div>
      )}
    </div>
  );
}