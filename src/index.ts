import { Hono } from "hono";

type Bindings = {
  SEQTADM: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.all("/", async (c) => {
  let times = await c.env.SEQTADM.get(`count`);

  let html = `<html><head><script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js"></script>

  <style>

  button,
  input[type="button"],
  input[type="submit"],
  input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    /* Optional: Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    /* Optional: Corrects inability to style clickable input types in iOS */
    -webkit-appearance: none;
  }


  body {
    position: relative;
  }

  .centered-div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-top-left-radius:300px;
   border-top-right-radius:300px;
   border-bottom-left-radius:300px;
   border-bottom-right-radius:300px;
   background-color: red;
   font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
   font-size:20px;
    height: 200px;
    width: 200px;
    transition: box-shadow 0.3s ease-in-out;

    }

    .text {

      text-align: center;
      position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;


    }

    .centered-div:hover {
    box-shadow: 0px 0px 10px red;
    }

    .centered-div:active {
      zoom: 95%;

    }

    .error {
    font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;
     font-size:23px;
     background-color:#f1c40f;
     background-position-x:0%;
     border-width:0px;
     border-top-left-radius:5px;
     border-top-right-radius:5px;
     border-bottom-left-radius:5px;
     border-bottom-right-radius:5px;
    }

  </style>

  <style>.htmx-indicator{opacity:0;visibility: hidden} .htmx-request .htmx-indicator, .htmx-request.htmx-indicator{opacity:1;visibility: visible;transition: opacity 200ms ease-in}</style></head><body><div class="parent-container">

  <div class="error">
  Attention users, we have hit our daily limits for our hosting provider therefore the clicking count can no longer increase. We are working to resolve this issue currently. An update should fix this soon.

  </div>
  <button hx-post="/clicked"   hx-swap="outerHTML" class="centered-div">

  <div class="text">

  <div class="update" hx-post="/update" hx-trigger="every 2s">

  This button has been clicked ${times}

  </div>

  </div>


  </button>


  </div></body></html>`;

  return c.html(html);
});

app.all("/clicked", async (c) => {
  let times = await c.env.SEQTADM.get(`count`);

  let timesnumber = parseInt(times);

  timesnumber++;

  let html = `
  <button hx-post="/clicked"   hx-swap="outerHTML" class="centered-div">

  <div class="text">

  <div class="update" hx-post="/update" hx-trigger="every 2s">

  This button has been clicked ${timesnumber}

  </div>

  </div>

  </button>

  `;

  // c.executionCtx.waitUntil(c.env.SEQTADM.put(`count`, timesnumber.toString()));

  return c.html(html);
});

app.all("/update", async (c) => {
  let times = await c.env.SEQTADM.get(`count`);

  let timesnumber = parseInt(times);

  timesnumber++;

  let html = `
    <div class="update" hx-post="/update" hx-trigger="every 2s">

    This button has been clicked ${timesnumber}

    </div>
  `;

  return c.html(html);
});

export default app;
