import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  en: {
 HOME: "Home",
 SHOP: "Shop",
CATEGORIES: "Categories",
CONTACT: "Contact",
SEARCH: "Search products...",
LANG: "Language",
FEATURED_PRODUCTS: "Featured Products",

FOOTER_DESC: "Best store for little explorers",
FOOTER_NAV: "Navigation",
FOOTER_HELP: "Help",
FOOTER_SOCIAL: "Social",
FOOTER_SHIPPING: "Shipping",
FOOTER_REFUND: "Refund",
FOOTER_FAQ: "FAQ",

SLIDE_1_TITLE: "Welcome to TupTup",
SLIDE_1_SUBTITLE: "Toys, clothes & essentials for kids",
SLIDE_2_TITLE: "New Collection",
SLIDE_2_SUBTITLE: "Comfort & style for little ones",
SLIDE_3_TITLE: "Winter Sale",
SLIDE_3_SUBTITLE: "Up to 30% off",

SLIDER_BTN: "Shop Now",
ADD_TO_CART: "Add to cart",
SHOP_DESC: "Find the best products for kids",
ALL: "All",

SORT_BY: "Sort by",
PRICE_ASC: "Price ↑",
PRICE_DESC: "Price ↓",
NAME_ASC: "Name A–Z",
NAME_DESC: "Name Z–A",
LOAD_MORE: "Load more",
NOTHING_FOUND: "Nothing found 😔",
LOADING: "Loading…",
PRODUCT_LOADING: "Loading product...",
PRODUCT_NOT_FOUND: "Product not found",
BACK_TO_SHOP: "Back to shop",
CATEGORY: "Category",
ADD_TO_CART: "Add to cart",
RELATED_PRODUCTS: "You may also like",

CONTACT_TITLE: "Contact Us",
CONTACT_GET_IN_TOUCH: "Get in touch",
CONTACT_ADDRESS: "Warsaw, Poland",
CONTACT_HOURS: "Working hours",
CONTACT_WEEK: "Mon – Fri: 9:00 – 18:00",
CONTACT_WEEKEND: "Sat – Sun: Closed",
CONTACT_SUCCESS_TITLE: "Thank you!",
CONTACT_SUCCESS_TEXT_1: "Your message has been sent.",
CONTACT_SUCCESS_TEXT_2: "Our team will contact you shortly.",
CONTACT_NAME: "Your Name",
CONTACT_NAME_PH: "John Doe",
CONTACT_EMAIL: "Email Address",
CONTACT_EMAIL_PH: "email@example.com",
CONTACT_PHONE: "Phone (optional)",
CONTACT_PHONE_PH: "+48 500 200 300",
CONTACT_MESSAGE: "Message",
CONTACT_MESSAGE_PH: "Write your message here...",
CONTACT_SEND: "Send Message",
CONTACT_SENDING: "Sending...",

CHECKOUT_TITLE: "Checkout",
CHECKOUT_EMPTY: "Your cart is empty",
CHECKOUT_FILL_ALL: "Please fill in all fields",
CHECKOUT_INVALID_EMAIL: "Please enter a valid email address",
CHECKOUT_NAME: "Full Name",
CHECKOUT_NAME_PH: "John Doe",
CHECKOUT_EMAIL: "Email Address",
CHECKOUT_EMAIL_PH: "john@email.com",
CHECKOUT_EMAIL_HELP: "We’ll never share your email with anyone else.",
CHECKOUT_ADDRESS: "Delivery Address",
CHECKOUT_ADDRESS_PH: "Street, city, postal code",
CHECKOUT_TOTAL: "Total:",
CHECKOUT_PAY: "Pay now",
CHECKOUT_PROCESSING: "Processing payment…",
CHECKOUT_SUCCESS_TITLE: "Thank you for your purchase!",
CHECKOUT_SUCCESS_TEXT: "Your order has been successfully placed and paid.",
CHECKOUT_ORDER: "Order number:",
CHECKOUT_PAYMENT_CONFIRMED: "Payment confirmed",
CHECKOUT_ADMIN: "Our administrator will contact you shortly.",

CATEGORIES_TITLE: "Categories",
CATEGORY_TOYS: "Toys",
CATEGORY_CLOTHES: "Clothes",
CATEGORY_SHOES: "Shoes",
CATEGORY_BOOKS: "Books",

CART_EMPTY_TITLE: "Your cart is empty",
CART_EMPTY_TEXT: "Looks like you haven’t added anything yet",
CART_GO_SHOP: "Go to shop",

CART_TITLE: "Your Cart",
CART_SUMMARY: "Order Summary",
CART_ITEMS: "Items",
CART_TOTAL: "Total",
CART_CHECKOUT: "Proceed to Checkout",
  },

  pl: {
    HOME: "Strona główna",
    SHOP: "Sklep",
    CATEGORIES: "Kategorie",
    CONTACT: "Kontakt",
    SEARCH: "Szukaj produktów...",
    LANG: "Język",

    FEATURED_PRODUCTS: "Polecane produkty",

    FOOTER_DESC: "Najlepszy sklep dla małych odkrywców",
    FOOTER_NAV: "Nawigacja",
    FOOTER_HELP: "Pomoc",
    FOOTER_SOCIAL: "Społeczność",
    FOOTER_SHIPPING: "Dostawa",
    FOOTER_REFUND: "Zwroty",
    FOOTER_FAQ: "FAQ",

SLIDE_1_TITLE: "Witamy w TupTup",
SLIDE_1_SUBTITLE: "Zabawki, ubrania i akcesoria dla dzieci",

SLIDE_2_TITLE: "Nowa kolekcja",
SLIDE_2_SUBTITLE: "Komfort i styl dla najmłodszych",

SLIDE_3_TITLE: "Zimowa wyprzedaż",
SLIDE_3_SUBTITLE: "Do 30% taniej",

SLIDER_BTN: "Kup teraz",
ADD_TO_CART: "Dodaj do koszyka",
    SHOP_TITLE: "Sklep",
    SHOP_SUBTITLE: "Znajdź najlepsze produkty dla dzieci",
    LOAD_MORE: "Pokaż więcej",
    SORT_BY: "Sortuj",
    PRICE_ASC: "Cena ↑",
    PRICE_DESC: "Cena ↓",
    NAME_ASC: "Nazwa A–Z",
    NAME_DESC: "Nazwa Z–A",
    NOTHING_FOUND: "Nic nie znaleziono 😔",
    ADD_TO_CART: "Dodaj do koszyka",
    PRODUCT_LOADING: "Ładowanie produktu...",
PRODUCT_NOT_FOUND: "Produkt nie znaleziony",
BACK_TO_SHOP: "Powrót do sklepu",
CATEGORY: "Kategoria",
ADD_TO_CART: "Dodaj do koszyka",
RELATED_PRODUCTS: "Może Ci się spodobać",
CONTACT_TITLE: "Kontakt",
CONTACT_GET_IN_TOUCH: "Skontaktuj się z nami",
CONTACT_ADDRESS: "Warszawa, Polska",
CONTACT_HOURS: "Godziny pracy",
CONTACT_WEEK: "Pn – Pt: 9:00 – 18:00",
CONTACT_WEEKEND: "Sb – Nd: Zamknięte",
CONTACT_SUCCESS_TITLE: "Dziękujemy!",
CONTACT_SUCCESS_TEXT_1: "Twoja wiadomość została wysłana.",
CONTACT_SUCCESS_TEXT_2: "Skontaktujemy się wkrótce.",
CONTACT_NAME: "Twoje imię",
CONTACT_NAME_PH: "Jan Kowalski",
CONTACT_EMAIL: "Adres email",
CONTACT_EMAIL_PH: "email@przyklad.pl",
CONTACT_PHONE: "Telefon (opcjonalnie)",
CONTACT_PHONE_PH: "+48 500 200 300",
CONTACT_MESSAGE: "Wiadomość",
CONTACT_MESSAGE_PH: "Wpisz swoją wiadomość...",
CONTACT_SEND: "Wyślij wiadomość",
CONTACT_SENDING: "Wysyłanie...",
CHECKOUT_TITLE: "Checkout",
CHECKOUT_EMPTY: "Your cart is empty",
CHECKOUT_FILL_ALL: "Please fill in all fields",
CHECKOUT_INVALID_EMAIL: "Please enter a valid email address",

CHECKOUT_NAME: "Full Name",
CHECKOUT_NAME_PH: "John Doe",
CHECKOUT_EMAIL: "Email Address",
CHECKOUT_EMAIL_PH: "john@email.com",
CHECKOUT_EMAIL_HELP: "We’ll never share your email with anyone else.",
CHECKOUT_ADDRESS: "Delivery Address",
CHECKOUT_ADDRESS_PH: "Street, city, postal code",
CHECKOUT_TOTAL: "Total:",
CHECKOUT_PAY: "Pay now",
CHECKOUT_PROCESSING: "Processing payment…",
CHECKOUT_SUCCESS_TITLE: "Thank you for your purchase!",
CHECKOUT_SUCCESS_TEXT: "Your order has been successfully placed and paid.",
CHECKOUT_ORDER: "Order number:",
CHECKOUT_PAYMENT_CONFIRMED: "Payment confirmed",
CHECKOUT_ADMIN: "Our administrator will contact you shortly.",

CATEGORIES_TITLE: "Kategorie",
CATEGORY_TOYS: "Zabawki",
CATEGORY_CLOTHES: "Ubrania",
CATEGORY_SHOES: "Buty",
CATEGORY_BOOKS: "Książki",

CART_EMPTY_TITLE: "Twój koszyk jest pusty",
CART_EMPTY_TEXT: "Wygląda na to, że nic jeszcze nie dodałeś",
CART_GO_SHOP: "Przejdź do sklepu",
CART_TITLE: "Twój koszyk",
CART_SUMMARY: "Podsumowanie zamówienia",
CART_ITEMS: "Produkty",
CART_TOTAL: "Suma",
CART_CHECKOUT: "Przejdź do kasy",
  },

  uk: {
    HOME: "Головна",
    SHOP: "Магазин",
    CATEGORIES: "Категорії",
    CONTACT: "Контакти",
    SEARCH: "Пошук товарів...",
    LANG: "Мова",

    FEATURED_PRODUCTS: "Рекомендовані товари",
    FOOTER_DESC: "Найкращий магазин для маленьких дослідників",
    FOOTER_NAV: "Навігація",
    FOOTER_HELP: "Допомога",
    FOOTER_SOCIAL: "Соцмережі",
    FOOTER_SHIPPING: "Доставка",
    FOOTER_REFUND: "Повернення",
    FOOTER_FAQ: "FAQ",

SLIDE_1_TITLE: "Ласкаво просимо до TupTup",
SLIDE_1_SUBTITLE: "Іграшки, одяг та все для дітей",
SLIDE_2_TITLE: "Нова колекція",
SLIDE_2_SUBTITLE: "Комфорт і стиль для малечі",
SLIDE_3_TITLE: "Зимовий розпродаж",
SLIDE_3_SUBTITLE: "Знижки до 30%",

SLIDER_BTN: "До магазину",
ADD_TO_CART: "Додати в кошик",
    SHOP_TITLE: "Магазин",
    SHOP_SUBTITLE: "Знайдіть найкращі товари для дітей",
    LOAD_MORE: "Показати ще",
    SORT_BY: "Сортувати",
    PRICE_ASC: "Ціна ↑",
    PRICE_DESC: "Ціна ↓",
    NAME_ASC: "Назва A–Z",
    NAME_DESC: "Назва Z–A",
    NOTHING_FOUND: "Нічого не знайдено 😔",
    ADD_TO_CART: "Додати в кошик",
    PRODUCT_LOADING: "Завантаження товару...",
PRODUCT_NOT_FOUND: "Товар не знайдено",
BACK_TO_SHOP: "Повернутися до магазину",
CATEGORY: "Категорія",
ADD_TO_CART: "Додати в кошик",
RELATED_PRODUCTS: "Вам також може сподобатися",

CONTACT_TITLE: "Контакти",
CONTACT_GET_IN_TOUCH: "Зв’яжіться з нами",
CONTACT_ADDRESS: "Варшава, Польща",
CONTACT_HOURS: "Години роботи",
CONTACT_WEEK: "Пн – Пт: 9:00 – 18:00",
CONTACT_WEEKEND: "Сб – Нд: Зачинено",
CONTACT_SUCCESS_TITLE: "Дякуємо!",
CONTACT_SUCCESS_TEXT_1: "Ваше повідомлення надіслано.",
CONTACT_SUCCESS_TEXT_2: "Ми зв’яжемося з вами найближчим часом.",
CONTACT_NAME: "Ваше ім’я",
CONTACT_NAME_PH: "Іван Петренко",
CONTACT_EMAIL: "Електронна пошта",
CONTACT_EMAIL_PH: "email@example.com",
CONTACT_PHONE: "Телефон (необов’язково)",
CONTACT_PHONE_PH: "+48 500 200 300",
CONTACT_MESSAGE: "Повідомлення",
CONTACT_MESSAGE_PH: "Напишіть ваше повідомлення...",
CONTACT_SEND: "Надіслати",
CONTACT_SENDING: "Надсилання...",

CHECKOUT_TITLE: "Оформлення замовлення",
CHECKOUT_EMPTY: "Ваш кошик порожній",
CHECKOUT_FILL_ALL: "Будь ласка, заповніть усі поля",
CHECKOUT_INVALID_EMAIL: "Будь ласка, введіть коректну електронну адресу",

CHECKOUT_NAME: "Повне імʼя",
CHECKOUT_NAME_PH: "Іван Іваненко",
CHECKOUT_EMAIL: "Електронна пошта",
CHECKOUT_EMAIL_PH: "ivan@email.com",
CHECKOUT_EMAIL_HELP: "Ми ніколи не передаємо вашу електронну пошту третім особам.",
CHECKOUT_ADDRESS: "Адреса доставки",
CHECKOUT_ADDRESS_PH: "Вулиця, місто, поштовий індекс",
CHECKOUT_TOTAL: "Разом:",
CHECKOUT_PAY: "Оплатити",
CHECKOUT_PROCESSING: "Обробка платежу…",
CHECKOUT_SUCCESS_TITLE: "Дякуємо за покупку!",
CHECKOUT_SUCCESS_TEXT: "Ваше замовлення успішно оформлено та оплачено.",
CHECKOUT_ORDER: "Номер замовлення:",
CHECKOUT_PAYMENT_CONFIRMED: "Платіж підтверджено",
CHECKOUT_ADMIN: "Наш адміністратор звʼяжеться з вами найближчим часом.",

CATEGORIES_TITLE: "Категорії",
CATEGORY_TOYS: "Іграшки",
CATEGORY_CLOTHES: "Одяг",
CATEGORY_SHOES: "Взуття",
CATEGORY_BOOKS: "Книги",
CART_EMPTY_TITLE: "Ваш кошик порожній",
CART_EMPTY_TEXT: "Схоже, ви ще нічого не додали",
CART_GO_SHOP: "Перейти до магазину",

CART_TITLE: "Ваш кошик",
CART_SUMMARY: "Підсумок замовлення",
CART_ITEMS: "Товари",
CART_TOTAL: "Разом",
CART_CHECKOUT: "Перейти до оплати",
  },

  ja: {
    HOME: "ホーム",
    SHOP: "ショップ",
    CATEGORIES: "カテゴリー",
    CONTACT: "お問い合わせ",
    SEARCH: "商品を検索...",
    LANG: "言語",

    FEATURED_PRODUCTS: "おすすめ商品",

    FOOTER_DESC: "小さな冒険者のための最高のお店",
    FOOTER_NAV: "ナビゲーション",
    FOOTER_HELP: "ヘルプ",
    FOOTER_SOCIAL: "ソーシャル",
    FOOTER_SHIPPING: "配送",
    FOOTER_REFUND: "返金",
    FOOTER_FAQ: "FAQ",

SLIDE_1_TITLE: "TupTupへようこそ",
SLIDE_1_SUBTITLE: "子どものためのおもちゃと洋服",
SLIDE_2_TITLE: "新コレクション",
SLIDE_2_SUBTITLE: "小さな子どもに快適さとスタイルを",
SLIDE_3_TITLE: "ウィンターセール",
SLIDE_3_SUBTITLE: "最大30%オフ",
SLIDER_BTN: "ショップへ",

ADD_TO_CART: "カートに追加",

 SHOP_TITLE: "ショップ",
 SHOP_SUBTITLE: "子供向けの最高の商品を見つけましょう",
 LOAD_MORE: "さらに表示",
 SORT_BY: "並び替え",
PRICE_ASC: "価格 ↑",
 PRICE_DESC: "価格 ↓",
 NAME_ASC: "名前 A–Z",
 NAME_DESC: "名前 Z–A",
NOTHING_FOUND: "見つかりませんでした 😔",
ADD_TO_CART: "カートに追加",
 PRODUCT_LOADING: "商品を読み込み中...",
PRODUCT_NOT_FOUND: "商品が見つかりません",
BACK_TO_SHOP: "ショップに戻る",

CATEGORY: "カテゴリー",
ADD_TO_CART: "カートに追加",
RELATED_PRODUCTS: "おすすめ商品",

CONTACT_TITLE: "お問い合わせ",
CONTACT_GET_IN_TOUCH: "お問い合わせください",
CONTACT_ADDRESS: "ポーランド、ワルシャワ",
CONTACT_HOURS: "営業時間",
CONTACT_WEEK: "月–金: 9:00 – 18:00",
CONTACT_WEEKEND: "土–日: 休業",
CONTACT_SUCCESS_TITLE: "ありがとうございます！",
CONTACT_SUCCESS_TEXT_1: "メッセージが送信されました。",
CONTACT_SUCCESS_TEXT_2: "近日中にご連絡いたします。",
CONTACT_NAME: "お名前",
CONTACT_NAME_PH: "山田 太郎",
CONTACT_EMAIL: "メールアドレス",
CONTACT_EMAIL_PH: "email@example.com",
CONTACT_PHONE: "電話番号（任意）",
CONTACT_PHONE_PH: "+48 500 200 300",
CONTACT_MESSAGE: "メッセージ",
CONTACT_MESSAGE_PH: "こちらにご記入ください...",
CONTACT_SEND: "送信",
CONTACT_SENDING: "送信中...",

CHECKOUT_TITLE: "チェックアウト",
CHECKOUT_EMPTY: "カートは空です",
CHECKOUT_FILL_ALL: "すべての項目を入力してください",
CHECKOUT_INVALID_EMAIL: "正しいメールアドレスを入力してください",
CHECKOUT_NAME: "氏名",
CHECKOUT_NAME_PH: "山田 太郎",
CHECKOUT_EMAIL: "メールアドレス",
CHECKOUT_EMAIL_PH: "taro@email.com",
CHECKOUT_EMAIL_HELP: "メールアドレスが第三者に共有されることはありません。",
CHECKOUT_ADDRESS: "配送先住所",
CHECKOUT_ADDRESS_PH: "住所、都市、郵便番号",
CHECKOUT_TOTAL: "合計：",
CHECKOUT_PAY: "今すぐ支払う",
CHECKOUT_PROCESSING: "支払い処理中…",
CHECKOUT_SUCCESS_TITLE: "ご購入ありがとうございます！",
CHECKOUT_SUCCESS_TEXT: "ご注文は正常に完了し、支払いが確認されました。",
CHECKOUT_ORDER: "注文番号：",
CHECKOUT_PAYMENT_CONFIRMED: "支払い確認済み",
CHECKOUT_ADMIN: "担当者より近日中にご連絡いたします。",

CATEGORIES_TITLE: "カテゴリー",
CATEGORY_TOYS: "おもちゃ",
CATEGORY_CLOTHES: "服",
CATEGORY_SHOES: "靴",
CATEGORY_BOOKS: "本",

CART_EMPTY_TITLE: "カートは空です",
CART_EMPTY_TEXT: "まだ商品が追加されていません",
CART_GO_SHOP: "ショップへ行く",
CART_TITLE: "カート",
CART_SUMMARY: "注文概要",
CART_ITEMS: "商品数",
CART_TOTAL: "合計",
CART_CHECKOUT: "購入手続きへ",
  },
};

const supportedLanguages = ["en", "pl", "uk", "ja"];

function detectBrowserLanguage() {
  const browserLang = (navigator.language || "en")
    .toLowerCase()
    .slice(0, 2);

  return supportedLanguages.includes(browserLang)
    ? browserLang
    : "en";
}


const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    return saved && supportedLanguages.includes(saved)
      ? saved
      : detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key) =>
    translations[lang]?.[key] ??
    translations.en?.[key] ??
    key;

  const value = useMemo(
    () => ({ lang, setLang, t }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error(
      "useLanguage must be used inside <LanguageProvider>"
    );
  }
  return ctx;
}