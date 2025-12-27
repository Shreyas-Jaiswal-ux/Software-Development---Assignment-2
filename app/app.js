// Chat App Logic

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chat App</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <main class="app">

  <!-- ===== Username Screen ===== -->
    <section id="screen-username" class="screen active" aria-label="Username screen">
      <div class="card">
        <h1 class="title">Chat App</h1>
        <p class="subtitle">Twitter-ish vibes. Simple. Fast. Local.</p>

        <label class="label" for="usernameInput">Enter a username</label>
        <input id="usernameInput" class="input" type="text" maxlength="20" placeholder="e.g. Shreyas" autocomplete="nickname" />

        <p id="usernameError" class="error" role="alert" aria-live="polite"></p>

        <button id="enterChatBtn" class="btn primary">Enter Chat</button>

   <div class="tiny-row">
          <span class="tiny">Mode</span>
          <button id="toggleThemeBtn" class="btn small">Toggle</button>
        </div>
      </div>
    </section>
