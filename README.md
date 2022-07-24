# web_stopwatch_work

Cronômetro web para logar (salvar) suas horas de trabalho.

## Interface

![interface](interface.png)

## Acesso

A página está publicada em http://timer.techgenial.com.br

## Demonstração da aplicação

![uso](interface-uso.png)

## Tecnologias

- HTML

- CSS

- Javascript

#### Run local (container)

```shell
podman run --name site-stopwatch -v ./:/usr/share/nginx/html:ro -d -p 8081:80 docker.io/library/nginx
```
