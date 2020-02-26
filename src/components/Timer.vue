<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        />
        <path
          :stroke-dasharray="circleDasharray"
          :class="chColor"
          class="base-timer__path-remaining"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "></path>
      </g>
    </svg>
    <span class="base-timer__label">
      <!-- Remaining time label -->
      {{ formattedTime }}
    </span>
  </div>
</template>

<script>
const FULL_DASH_ARRAY = 283
const TIME_LIMIT = 30
const WARNING_THRESHOLD = 10
const ALERT_THRESHOLD = 5
const COLOR_CODES = {
  info: {
    color: 'green'
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD
  }
}
export default {
  data () {
    return {
      COUNTER_START: TIME_LIMIT,
      setTimer: 0
    }
  },
  watch: {
    COUNTER_START (val) {
      if (!val) {
        clearInterval(this.setTimer)
      }
    }
  },
  computed: {
    circleDasharray () {
      return [this.timeFraction.toFixed(0), FULL_DASH_ARRAY]
    },
    timeFraction () {
      return ((FULL_DASH_ARRAY + FULL_DASH_ARRAY / TIME_LIMIT) / TIME_LIMIT) * (TIME_LIMIT - this.COUNTER_START)
    },
    formattedTime () {
      let minutes = Math.floor(this.COUNTER_START / 60)
      let seconds = this.COUNTER_START % 60
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
    },
    chColor () {
      let style
      const { info, warning, alert } = COLOR_CODES
      if (alert.threshold >= this.COUNTER_START) {
        style = alert.color
      } else if (warning.threshold >= this.COUNTER_START) {
        style = warning.color
      } else {
        style = info.color
      }
      return style
    }
  },
  mounted () {
    this.startTimer()
  },
  methods: {
    startTimer () {
      this.setTimer = setInterval(() => {
        this.COUNTER_START--
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* Sets the containers height and width */
  .base-timer {
    position: relative;
    width: 50%;
    transform: translate(50%);
  }

  /* Removes SVG styling that would hide the time label */
  .base-timer__circle {
    fill: none;
    stroke: none;
  }

  /* The SVG path that displays the timer's progress */
  .base-timer__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }

  .base-timer__label {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    font-size: 10rem;

    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
  }

  .base-timer__path-remaining {
    /* Just as thick as the original ring */
    stroke-width: 7px;
    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;
    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;
    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;
    /* Allows the ring to change color when the color value updates */
  }

  .base-timer__svg {
    /* Flips the svg and makes the animation to move left-to-right*/
    transform: scaleX(1);
  }

  .red {
    stroke: red
  }
  .orange {
    stroke: orange
  }
  .green {
    stroke: rgb(65, 184, 131)
  }
</style>
