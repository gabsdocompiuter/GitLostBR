# GitLostBR
Um bot inspirado no [@gitlost](http://twitter.com/gitlost), porém em português.

![Programando sob pressão](http://giphygifs.s3.amazonaws.com/media/dbtDDSvWErdf2/giphy.gif)

O proprósito do GitLostBR é varrer todos os commits do GitHub, através de sua [API pública](https://api.github.com), selecionado todos aqueles que contém palavrões para então postar no [Twitter](https://twitter.com/GitLostBR).

## Tecnologias
### APIs:
 - [GitHub Search API](https://developer.github.com/v3/search/#search-commits) - O Projeto utiliza a API do Github para varrer todos os commits em busca daquelas que contém palavrões
 - [Twitter API](https://developer.twitter.com/en/docs.html) - API do Twitter para procurar e/ou postar tweets
### I.A:
 - [Watson Natural Language Understanding](https://www.ibm.com/watson/services/natural-language-understanding/) - Inteligência Artificial da IBM, no projeto, utilizada para verificar a linguagem do commit.
