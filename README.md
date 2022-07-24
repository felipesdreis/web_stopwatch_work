# web_stopwatch_work

Cronômetro web para logar (salvar) suas horas de trabalho.

## Demonstração

![interface](interface.png)

## Uso/Exemplos

![uso](interface-uso.png)

## Acesso

A página está publicada em http://timer.techgenial.com.br

## Stack utilizada

**Front-end:** HTML, CSS

**Back-end:** Javascript

#### Run local (container)

```shell
podman run --name site-stopwatch -v ./:/usr/share/nginx/html:ro -d -p 8081:80 docker.io/library/nginx
```

