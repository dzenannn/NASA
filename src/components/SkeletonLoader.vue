<template>
  <div class="skeleton-loader"></div>
</template>

<style scoped>
.skeleton-loader {
  position: relative;
  width: 250px;
}
.skeleton-loader:after {
  content: '';
  display: block;
  width: 219px;
  height: 315px;
  position: absolute;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(#aaaaaa 308px, transparent 0);
  background-size: 110px 100%, 215px 310px, 100% 100%;
  background-position: 0 0, 4px 5px, 0 0;
  animation: skeleton-animation 2600ms infinite;
}

@keyframes skeleton-animation {
  to {
    background-position: 100% 0, 4px 5px, 0 0;
  }
}
</style>
