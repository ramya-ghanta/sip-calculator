`
<template>
  <nav class="navbar-container">
    <div class="navbar-content">
      <div class="brand-container">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span class="brand-text">Chandu Wealth</span>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links" :class="{ 'show-menu': menuOpen }">
        <div
          v-for="(type, key) in investmentTypes"
          :key="key"
          @click="onInvestmentTypeChange(type)"
          :class="['nav-link', { 'nav-link-active': selectedType === key }]"
        >
          {{ type }}
        </div>
      </div>
      <!-- Menu Toggle -->
      <button class="menu-toggle" @click="toggleMenu">
        <span class="menu-icon">
          <span v-if="!menuOpen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </span>
          <span v-else>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InvestmentTypes } from '../constants';
const emit = defineEmits(['onInvestmentTypeChange']);
const menuOpen = ref(false);
const selectedType = ref(InvestmentTypes.SIP);
const investmentTypes = InvestmentTypes;
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const onInvestmentTypeChange = (type: InvestmentTypes) => {
  selectedType.value = type as any;
  emit('onInvestmentTypeChange', type);
  console.log('***type', type);
  menuOpen.value = false;
};
</script>

<style scoped>
.navbar-container {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.navbar-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand styles */
.brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 2rem;
  height: 2rem;
  color: white;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

/* Navigation links styles */
.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-link {
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Menu toggle styles */
.menu-toggle {
  display: none;
  color: white;
  padding: 0.5rem;
  transition: all 0.2s;
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: block;
}

.menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile styles */
@media (max-width: 768px) {
  .navbar-content {
    padding: 0.5rem;
  }

  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    padding: 0.5rem;
    gap: 0.25rem;
  }

  .nav-links.show-menu {
    display: flex;
  }

  .nav-link {
    width: 100%;
    text-align: left;
  }
}
</style>
`
