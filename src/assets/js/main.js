document.addEventListener('DOMContentLoaded', () => {
  // === Theme Toggle Management ===
  const themeToggle = document.getElementById('theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return 'light';
  };
  
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
  
  // Initialize Theme
  setTheme(getPreferredTheme());
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // === Mobile Navigation Toggle ===
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== menuToggle) {
        navMenu.classList.remove('active');
      }
    });
  }

  // === FAQ Accordion Logic ===
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all FAQs
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
      });
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // === Search Modal & Index Logic ===
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  let selectedIndex = -1;
  let matches = [];

  const openSearch = () => {
    if (searchModal) {
      searchModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
      setTimeout(() => searchInput && searchInput.focus(), 50);
      selectedIndex = -1;
    }
  };

  const closeSearch = () => {
    if (searchModal) {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
      matches = [];
      selectedIndex = -1;
    }
  };

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Ctrl + K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Keyboard navigation inside search results
  if (searchInput && searchResults) {
    searchInput.addEventListener('keydown', (e) => {
      const items = searchResults.querySelectorAll('.search-result-link');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateSelection(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          items[selectedIndex].click();
        } else if (items.length > 0) {
          items[0].click();
        }
      }
    });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        searchResults.innerHTML = '';
        matches = [];
        selectedIndex = -1;
        return;
      }

      // Search inside global index
      const searchIndex = window.SEARCH_INDEX || [];
      matches = searchIndex.filter(item => {
        const titleMatch = item.title && item.title.toLowerCase().includes(query);
        const summaryMatch = item.summary && item.summary.toLowerCase().includes(query);
        const tagsMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(query));
        return titleMatch || summaryMatch || tagsMatch;
      });

      renderResults(matches);
    });
  }

  function updateSelection(items) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  function renderResults(items) {
    if (!searchResults) return;
    searchResults.innerHTML = '';
    selectedIndex = -1;

    if (items.length === 0) {
      searchResults.innerHTML = '<li class="search-empty">没有找到相关文章，请换个词试试</li>';
      return;
    }

    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      
      const a = document.createElement('a');
      a.className = 'search-result-link';
      a.href = item.url;
      
      const title = document.createElement('div');
      title.className = 'search-result-title';
      title.textContent = item.title;
      
      const snippet = document.createElement('div');
      snippet.className = 'search-result-snippet';
      // Truncate summary if too long
      const text = item.summary || '';
      snippet.textContent = text.length > 80 ? text.substring(0, 80) + '...' : text;
      
      a.appendChild(title);
      a.appendChild(snippet);
      li.appendChild(a);
      searchResults.appendChild(li);
    });
  }

  // === Dynamic Tag Cloud & Badge Interaction ===
  const tagItems = document.querySelectorAll('.tag-item, .tag-cloud-item, .feature-tag');
  tagItems.forEach(item => {
    // Avoid binding if it's inside comparison lists with links
    if (item.tagName === 'A' && item.getAttribute('href') !== 'javascript:void(0)' && item.getAttribute('href') !== '#') {
      return;
    }
    item.addEventListener('click', (e) => {
      const tagText = item.getAttribute('data-tag') || item.textContent.replace(/[#🥇🥈🥉⭐]/g, '').trim();
      if (tagText && searchBtn) {
        e.preventDefault();
        openSearch();
        if (searchInput) {
          searchInput.value = tagText;
          searchInput.dispatchEvent(new Event('input'));
        }
      }
    });
    // Visual pointer style
    item.style.cursor = 'pointer';
  });

  // === Sticky Sidebar ScrollSpy ===
  const tocList = document.querySelector('.airport-toc-list');
  if (tocList) {
    const tocLinks = tocList.querySelectorAll('.toc-link');
    const cards = document.querySelectorAll('.airport-list-item');
    
    const scrollSpy = () => {
      let activeIndex = -1;
      const scrollPosition = window.scrollY + 120; // 120px offset for header and spacing
      
      cards.forEach((card, index) => {
        const top = card.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= top) {
          activeIndex = index;
        }
      });
      
      tocLinks.forEach((link, index) => {
        if (index === activeIndex) {
          link.classList.add('active');
          // Scroll link into view inside the sidebar if it overflows
          link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
          link.classList.remove('active');
        }
      });
    };
    
    // Listen for scroll
    window.addEventListener('scroll', scrollSpy);
    // Initial call
    scrollSpy();
  }
});
