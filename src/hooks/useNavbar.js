import { useState, useEffect, useRef } from "react";

const useNavbar = () => {
  const [showMenu, setShowMenu]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef                   = useRef(null);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when drawer open
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showMenu]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const openMenu     = () => setShowMenu(true);
  const closeMenu    = () => setShowMenu(false);
  const toggleSearch = () => setSearchOpen((v) => !v);
  const closeSearch  = () => setSearchOpen(false);

  return {
    showMenu,
    scrolled,
    searchOpen,
    searchRef,
    openMenu,
    closeMenu,
    toggleSearch,
    closeSearch,
  };
};

export default useNavbar;