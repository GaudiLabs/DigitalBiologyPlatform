import * as React from "react"

const LoggedPicto = (props) => (
  <svg
    width={33.906}
    height={33.951}
    viewBox="0 0 8.971 8.983"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="matrix(1.28486 0 0 1.28486 -339.71 -73.354)">
      <path
        style={{
          fill: "#000",
          stroke: "#000",
          strokeWidth: 0.0291124,
          strokeOpacity: 1,
        }}
        d="m267.536 64.06-.276-.046c-.66-.107-1.326-.458-1.837-.97a3.49 3.49 0 0 1-.963-1.768c-.067-.297-.067-1.091 0-1.388a3.49 3.49 0 0 1 .963-1.769 3.49 3.49 0 0 1 1.768-.962c.297-.068 1.092-.068 1.388 0a3.49 3.49 0 0 1 1.77.962 3.49 3.49 0 0 1 .962 1.769c.067.297.067 1.091 0 1.388a3.49 3.49 0 0 1-.963 1.768 3.46 3.46 0 0 1-1.769.96c-.206.045-.894.08-1.043.055z"
      />
      <path
        style={{
          fill: "#fff",
          stroke: "#000",
          strokeWidth: 0.0291124,
          strokeOpacity: 1,
        }}
        d="M268.385 63.683a3.159 3.159 0 0 0 2.319-1.718c.769-1.54.127-3.42-1.436-4.201-1.538-.77-3.419-.127-4.2 1.435-.77 1.538-.128 3.42 1.435 4.201.57.286 1.268.39 1.882.283z"
      />
      <circle
        style={{
          opacity: 1,
          fill: "red",
          fillOpacity: 0.99475,
          stroke: "#000",
          strokeWidth: 0.353345,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          stopColor: "#000",
          stopOpacity: 1,
        }}
        cx={267.885}
        cy={59.974}
        r={0.993}
      />
      <path
        style={{
          fontVariationSettings: "normal",
          opacity: 1,
          fill: "red",
          fillOpacity: 1,
          stroke: "#000",
          strokeWidth: 0.350232,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          stopColor: "#000",
          stopOpacity: 1,
        }}
        d="M265.782 63.093s.195-1.058.71-1.49c.587-.492.877-.038 1.387-.038s.897-.385 1.484.108c.515.432.646 1.447.646 1.447-1.418.907-2.861 1.077-4.227-.027z"
      />
    </g>
  </svg>
)

const ArrowRight = (props) => (
  <svg
    width="7mm"
    height="7mm"
    viewBox="0 0 7 7"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      style={{
        color: "#000",
        fill: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        InkscapeStroke: "none",
      }}
      d="M3.5 0C1.57 0 0 1.57 0 3.5S1.57 7 3.5 7 7 5.43 7 3.5 5.43 0 3.5 0Zm0 .354A3.143 3.143 0 0 1 6.646 3.5 3.145 3.145 0 0 1 3.5 6.648 3.146 3.146 0 0 1 .352 3.5 3.145 3.145 0 0 1 3.5.354Z"
    />
    <path
      style={{
        fill: "#000",
        stroke: "none",
        strokeWidth: 0.0219313,
      }}
      d="M5.237 3.57c-.024.053-1.277 1.295-1.371 1.36-.054.037-.071.039-.125.014-.034-.015-.066-.05-.072-.077a4.673 4.673 0 0 1-.015-.384l-.005-.335-.923-.012c-.883-.011-.924-.014-.952-.056-.044-.066-.044-1.093 0-1.159.028-.042.069-.045.952-.056l.923-.011.005-.335c.003-.185.01-.358.015-.385.006-.027.038-.061.072-.077.054-.025.071-.023.125.014.105.073 1.348 1.31 1.373 1.367.027.063.027.071-.001.132zm-.88-.602-.417-.41-.006.263c-.005.202-.014.271-.04.303-.031.039-.095.041-.946.041h-.913v.67h.913c.85 0 .915.003.946.042.026.032.035.1.04.303l.006.261.475-.468.475-.469-.059-.063a34.668 34.668 0 0 0-.475-.473Z"
    />
  </svg>
)

const ArrowLeft = (props) => (
  <svg
    width="7mm"
    height="7mm"
    viewBox="0 0 7 7"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      style={{
        color: "#000",
        fill: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        InkscapeStroke: "none",
      }}
      d="M3.5 0C1.57 0 0 1.57 0 3.5S1.57 7 3.5 7 7 5.43 7 3.5 5.43 0 3.5 0Zm0 .354A3.143 3.143 0 0 1 6.646 3.5 3.145 3.145 0 0 1 3.5 6.648 3.146 3.146 0 0 1 .352 3.5 3.145 3.145 0 0 1 3.5.354Z"
    />
    <path
      style={{
        fill: "#000",
        stroke: "none",
        strokeWidth: 0.0219313,
      }}
      d="M1.762 3.431c.025-.053 1.277-1.295 1.372-1.36.053-.037.07-.039.124-.014.034.015.067.05.073.077.005.027.012.2.015.384l.005.335.923.012c.883.011.924.013.952.056.043.066.043 1.093 0 1.158-.028.043-.07.046-.952.057l-.923.011-.005.335c-.003.185-.01.358-.015.385-.006.027-.039.061-.073.077-.053.025-.07.023-.124-.014-.105-.073-1.349-1.31-1.373-1.367-.027-.063-.027-.071.001-.132zm.881.602.417.41.005-.263c.005-.202.014-.271.04-.303.032-.039.096-.042.946-.042h.913v-.67h-.912c-.851 0-.915-.003-.947-.04-.026-.033-.035-.102-.04-.304L3.06 2.56l-.475.468-.475.469.058.063c.033.035.246.247.475.473z"
    />
  </svg>
)

export {ArrowRight, ArrowLeft, LoggedPicto};
