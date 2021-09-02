<script>
  export default {
    name: `Collapse`,
    functional: true,
    render(createElement, context) {
      const data = {
        props: {
          name: `expand`,
        },
        on: {
          afterEnter(element) {
            element.style.height = `auto`;
          },
          enter(element) {
            const { width } = getComputedStyle(element);

            element.style.width = width;
            element.style.position = `absolute`;
            element.style.visibility = `hidden`;
            element.style.height = `auto`;
            element.style.opacity = 1;

            const { height } = getComputedStyle(element);
            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;
            element.style.opacity = 0;

            // eslint-disable-next-line no-unused-expressions
            getComputedStyle(element).height;

            // eslint-disable-next-line no-unused-expressions
            getComputedStyle(element).opacity;

            requestAnimationFrame(() => {
              element.style.height = height;
              element.style.opacity = 1;
            });
          },
          leave(element) {
            const { height } = getComputedStyle(element);
            element.style.height = height;
            element.style.opacity = 1;

            // eslint-disable-next-line no-unused-expressions
            getComputedStyle(element).height;

            // eslint-disable-next-line no-unused-expressions
            getComputedStyle(element).opacity;

            requestAnimationFrame(() => {
              element.style.height = 0;
              element.style.opacity = 0;
            });
          },
        },
      };
      return createElement(`transition`, data, context.children);
    },
  };
</script>

<style scoped>
  * {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
</style>

<style>
  .expand-enter-active {
    transition: height 0.5s ease, opacity 0.6s ease-in-out;
    overflow: hidden;
  }

  .expand-leave-active {
    transition: height 0.5s ease, opacity 0.4s ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }
</style>
