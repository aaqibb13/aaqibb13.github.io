---
date: 2020-09-23
authors: Aaqib Bashir Dar
readingTime: "3 minutes"
resource: https://gist.github.com/aaqibb13/2f57ca46974a80178d50dd1f7ef920ff
description: "Opening multiple tunnels with ngrok simultaneously"

---

### Introduction
Imagine a use-case where you're already testing a service using ngrok and you want to spin up a different service and test that service on a different port. Tricky situation, right? That's where ngrok's power to run multiple tunnels simultaneously comes into the picture.

### How?

ngrok Agent configuration file: The ngrok agent supports an optional, YAML configuration file which provides you with the power to run multiple tunnels simultaneously as well as to tweak some of its more advanced settings.

### Wondering where the Agent Configuration file is?

1. So, the default location of the ngrok agent configuration depends on your operating system. So, you can simply write:

 ```
 ngrok config check
 ```
This will validate and print the location of the configuration file. For the main operating systems, their default file locations are:

Linux: `~/.config/ngrok/ngrok.yml`

MacOS (Darwin): `~/Library/Application Support/ngrok/ngrok.yml`

Windows: `"%HOMEPATH%\AppData\Local\ngrok\ngrok.yml"`

2. Open the config file and replace the file with the following contents:
```
version: "2"
authtoken: 2aC32ipSr9Q9jGkNRAlgq8MnKtD_3DtHjjhsgdgsnTE6feu   # add your auth token you got from ngrok dashboard
tunnels:
  default-server:
    proto: http
    addr: 8000
    domain: supposedly-choice-monkey.ngrok-free.app # insert your static domain that you claimed from ngrok dashboard
  second-server:
    proto: http
    addr: 3000
```
3. After you've saved the file. You can try spinning multiple tunnels with a single command:

```
 ngrok start --all
```

4. You should be able to see something like:

<img width="630" alt="Screenshot 2024-08-13 at 3 00 29 PM" src="https://gist.github.com/user-attachments/assets/80f58c82-540e-4cdc-99bd-49d0df77c477">

Voila! You can clearly see two tunnels running simultaneously.
If you want to tweak around a bit. You can refer to the official documentation [^1]

### A kind of an Easter Egg 😛
Rather than using an automatically generated `uuid` like url ( https://b341-122-161-241-254.ngrok-free.app) everytime you spin up ngrok, you can actually claim your own static domain name on ngrok dashboard.

1. Go to your ngrok dashboard [^2]
<img width="1434" alt="Screenshot 2024-08-13 at 3 06 32 PM" src="https://gist.github.com/user-attachments/assets/647ff0b9-76a2-44ef-83cf-a8890a21e690">

2. Scroll a bit down to **Deploy your app online** section:
<img width="938" alt="Screenshot 2024-08-13 at 3 19 58 PM" src="https://gist.github.com/user-attachments/assets/cd80d73e-89f5-4bf6-9c64-6005eb28bbcd">


3. Click on **Static Domain** to claim your free static domain. and you're done.
You can spin up the ngrok with the static domain (`supposedly-choice-monkey.ngrok-free.app` in my case) via the following command:
```
ngrok http --domain=supposedly-choice-monkey.ngrok-free.app 3000
```

[^1]: [Ngrok Agent Config](https://ngrok.com/docs/agent/config/)
[^2]: [Ngrok dashboard](https://dashboard.ngrok.com/get-started/setup/macos)
