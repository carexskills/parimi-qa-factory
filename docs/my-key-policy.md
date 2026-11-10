# My key policy (plain English)

One rule per line.

My key is mine. It goes only into .env on my laptop, and into GitHub Secrets for the pipeline.
.env is never committed. .env.example lists the names, never the values.
A key never appears in a prompt, a file, a log, or on screen.
No key? Use the no-key path: FACTORY_MODE=no-key, and the agents use my ChatGPT sign-in.
