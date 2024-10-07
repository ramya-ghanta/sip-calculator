<template>
  <div>
    <div class="topnav">
      <div :class="$style.navbarBrand">Chandu Wealth</div>
      <div id="myLinks">
        <a
          :class="[$style.option, investmentType === InvestmentTypes.SIP ? $style.selected : '']"
          @click="onInvestmentTypeChange(InvestmentTypes.SIP)"
        >
          SIP
        </a>
        <a
          :class="[
            $style.option,
            investmentType === InvestmentTypes.LUMPSUM ? $style.selected : ''
          ]"
          @click="onInvestmentTypeChange(InvestmentTypes.LUMPSUM)"
        >
          Lumpsum
        </a>
        <a
          :class="[$style.option, investmentType === InvestmentTypes.STEPUP ? $style.selected : '']"
          @click="onInvestmentTypeChange(InvestmentTypes.STEPUP)"
        >
          Step Up SIP
        </a>
        <a
          :class="[$style.option, investmentType === InvestmentTypes.YEARLY ? $style.selected : '']"
          @click="onInvestmentTypeChange(InvestmentTypes.YEARLY)"
        >
          Yearly SIP
        </a>
        <a
          :class="[$style.option, investmentType === InvestmentTypes.SWP ? $style.selected : '']"
          @click="onInvestmentTypeChange(InvestmentTypes.SWP)"
        >
          SIP + SWP
        </a>
      </div>
      <a href="javascript:void(0);" class="icon" @click="toggleMenu()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InvestmentTypes } from '../constants';

function toggleMenu() {
  var x = document.getElementById('myLinks') as any;
  if (x?.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

const menuOpen = ref(false);

// const toggleMenu = () => {
//   menuOpen.value = !menuOpen.value;
// };

const emits = defineEmits(['onInvestmentTypeChange']);
const investmentType = ref(InvestmentTypes.SIP);

const onInvestmentTypeChange = (type: InvestmentTypes) => {
  investmentType.value = type;
  emits('onInvestmentTypeChange', type);
  menuOpen.value = false;
};
</script>

<style module>
.sip-options {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 1rem;
  overflow: auto;
  scrollbar-width: thin;
  flex-wrap: wrap;
}

.option {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

.selected {
  background-color: #10b981;
  color: white;
}

.navbarBrand {
  font-weight: 800;
  font-size: 2rem;
  color: aliceblue;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 0.5rem;
}
</style>

<style>
/* Style the navigation menu */
.topnav {
  overflow: hidden;
  background-color: #10b981;
  position: relative;
  display: flex;
  justify-content: space-between;
}

/* Hide the links inside the navigation menu (except for logo/home) */
.topnav #myLinks {
  display: flex;
}

/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

.topnav a.icon {
  display: none;
}

@media (max-width: 768px) {
  .topnav {
    display: block;
    background-color: #10b981;
  }

  .topnav a.icon {
    background: #04aa6d;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 2rem;
    padding: 0.5rem;
  }
}

@media (min-width: 769px) {
  .topnav {
    display: flex;
    justify-content: space-between;
  }

  .topnav #myLinks {
    display: flex !important;
  }
}

/* Add a grey background color on mouse-over */
.topnav a:hover {
  background-color: #04aa6d;
  color: white;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #04aa6d;
  color: white;
}
</style>
