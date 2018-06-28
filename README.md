
# [Caffeinateddave.github.io](caffeinateddave.github.io)

Homepage for things I find useful... Maybe you will too?

### Cheatsheets
* [Docker](Caffeinateddave.github.io/cheat/docker) (as I learn it..)

### Tools
Couple handy helpers for things I use a lot
##### [Card Generator](Caffeinateddave.github.io/cardgen)
Generates card numbers from some major ranges.

###### To come:
* Fiscale Code (Italian NI-like Tax code) Generator
* ...

### Misc

###### nginx.conf:
Used for docker nginx.

Start container with

```docker run --name github-nginx -p80:80 -v `pwd`:/usr/share/nginx/html:ro -v `pwd`/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx```

 from the root of this repo.
