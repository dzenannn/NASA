export default {
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: '0px 0px -10px 0px',
      threshold: 0.1,
    };

    function loadImage() {
      const imageElement = el.tagName === 'IMG' ? el : el.querySelector('img');

      if (imageElement) {
        const imageSource = binding.value;

        imageElement.src = imageSource;
      }

      observer.unobserve(el);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) loadImage();
      });
    }, options);

    observer.observe(el);
  },
};
