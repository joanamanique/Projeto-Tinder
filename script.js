
//exercicio - 17 maio

/*criar class Library
Library tem um array de books*/

// var book1 = {
//     name:'Game of thrones',
//     writ: 'George R. R. Martin',
//     img:'GT.png',   
//     // desc: 'George R.R. Martins beCst-selling book series A Song of Ice and Fire is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic. Its the depiction of two powerful families - kings and queens, knights and renegades, liars and honest men - playing a deadly game for control of the Seven Kingdoms of Westeros, and to sit atop the Iron Throne. Martin is credited as a co-executive producer and one of the writers for the series, which was filmed in Northern Ireland and Malta',
//     links:{
//         0:{
//             text:'Wikipedia',
//             url:'https://en.wikipedia.org/wiki/Game_of_Thrones'
//         },
//         1:{
//             text:'Wook',
//             url:'https://www.wook.pt/livro/a-game-of-thrones-george-r-r-martin/11201476'
//         }
//     }  
// }

// var book2 = {
//     name:'War and peace',
//     writ: 'Leo Tolstoy',
//     img:'GP.png',   
//     desc: 'War and Peace it is regarded as a central work of world literature. War and Peace broadly focuses on Napoleons invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.',
//     links:{
//         0:{
//             text:'Wikipedia',
//             url:'https://en.wikipedia.org/wiki/War_and_Peace'
//         },
//         1:{
//             text:'Wook',
//             url:'https://www.wook.pt/livro/guerra-e-paz-lev-tolstoi/19597653'
//         }
//     }  
// }

// var book3 = {
//     name:'Hunger games',
//     writ: 'Suzanne Collins',
//     img:'HG.png',   
//     desc: 'In what was once North America, the Capitol of Panem maintains its hold on its 12 districts by forcing them each to select a boy and a girl, called Tributes, to compete in a nationally televised event called the Hunger Games. Every citizen must watch as the youths fight to the death until only one remains. District 12 Tribute Katniss Everdeen (Jennifer Lawrence) has little to rely on, other than her hunting skills and sharp instincts, in an arena where she must weigh survival against love.',
//     links:{
//         0:{     //0 e 1 para ser binário
//             text:'Wikipedia',
//             url:'https://en.wikipedia.org/wiki/The_Hunger_Games'
//         },
//         1:{
//             text:'Wook',
//             url:'https://www.wook.pt/livro/the-hunger-games-suzanne-collins/11522416'
//         }
//     }  
// }


/*comentam os últimos 2 livros; 
vão ao css e removem o css referente à visualização dos livros(display)*/



//Exercicios - 18 Maio - inserir divs de novo através de jquery atraves do load book + fazer os livros passar de uns para outros atrves de nextbook

class library {                                     //classe em js
    constructor() {                                 //método em js
        this.books = [];
        this.seenBooks = [];  
        this.maislivros=0;           //construtor corre independentemente de tudo
        // this.GetBooks("harry potter");  comentar para a pesquisa ser feita para qq livro e palavra 
    }
    Load(book) {
        $('.book h1').text(book.title);     //jQuery já tem as funções js implementadas
        $('.book h3').text(book.authors);
        $('.book img').attr("src", book.img);
        $('.book p').text(book.description);
        $('.book a').text("Preview");
        $('.book a').attr("href", book.link);
        // $.each(book.links,function(v,i){
        //     $(".book a").eq(i).text(v.text);
        //     $(".book a").eq(i).attr("href",v.url);
        // });
    }

    NextBook(opinion) {
        this.books[0].opinion = opinion;
        this.seenBooks.push(this.books[0]);   //push anexa novos elementos no fim a um array
        this.books.splice(0, 1);     //splice(index onde começa a mudar, nº de elementos q queremos remover)
        if (this.books.length > 0) {
            this.Load(this.books[0]);
        }
        else {
            $('#bookContainer').toggle(); //para desaparecer esta div
            $('#endPage').toggle();       //para aparecer esta div

            var linhatabela = "";
            this.seenBooks.forEach(function (v, i) {
                //coluna 1 - titulo, coluna 2-opinion
                //para cada elemento em seenbooks acrescenta uma linha
                linhatabela += `
                    <tr>
                        <td>` + v.title + `</td>
                        <td>` + v.authors + `</td>    
                        <td>` + v.opinion + `</td>
                        
                    </tr>`;
            });
            $('#display tbody').html(linhatabela);  //html método em jquery para definir um conteudo linhatabela em display tbodys
        }
    }

    GetBooks(search) {
        var obj = this;
        if (this.seenBooks.length == 0) {
            $.ajax({   //library js para comunicar c paginas web
                url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
            }).done(function (data) {
                //quando o pedido ajax terminar com sucesso
                //console.log(data);
                data.items.forEach(function (v, i) {
                    var book = {
                        title: v.volumeInfo.title,
                        authors: v.volumeInfo.authors,
                        description: v.volumeInfo.description,
                        img: v.volumeInfo.imageLinks.thumbnail,
                        opinion: "",
                        link: v.volumeInfo.previewLink,
                    }
                    obj.books.push(book);
                });

                obj.Load(obj.books[0]);
                obj.maislivros += 10;
               
            });
        }

        else {    //ha uma forma mais facil de fazer no trello
            $.ajax({
                url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&startIndex=" + this.maislivros,
            }).done(function (data) {
                data.items.forEach(function (v, i) {
                    var book = {
                        title: v.volumeInfo.title,
                        authors: v.volumeInfo.authors,
                        description: v.volumeInfo.description,
                        img: v.volumeInfo.imageLinks.thumbnail,
                        opinion: "",
                        link: v.volumeInfo.previewLink,
                    }
                    obj.books.push(book);
                });

                obj.Load(obj.books[0]);

                obj.maislivros += 10;
            });
        }
    }

    Reset() {
        this.books = this.seenBooks;
        this.seenBooks = [];
        this.Load(this.books[0]);
        $('#bookContainer').toggle();  //botão reset a voltar para 1º livro
        $('#endPage').toggle();
    }

    Start() {
        var pesquisa = $('#searchbox').val(); //função usada para obter valores de um input ou textarea (html)
        if (pesquisa.length >= 2) {
            this.GetBooks(pesquisa);
        }
    
        $('#startPage').toggle();    
        $('#bookContainer').toggle();
    }

    Newsearch() {
        $('#endPage').toggle();
        $('#startPage').toggle();  //botão a voltar para 1º pagina
        $('#searchbox').val(""); 
        this.maislivros=0;
    }
}


var lib = new library();  //ativar a classe library, só assim vai funcionar


$('.book button').click(function () {
    var opinion = $(this).attr("data-opinion");
    lib.NextBook(opinion);
});

$('.reset').click(function () {
    lib.Reset();
});

$('.search').click(function () {
    lib.Start();
});

$('.newsearch').click(function () {
    lib.Newsearch();
});

$('.readmore').click(function () {
    lib.GetBooks($('#searchbox').val()); 
    $('#bookContainer').toggle();
    $('#endPage').toggle();
});



var timer;
$('#searchbox').keyup(function(){  
    clearTimeout(timer);
    if($('#searchbox').val().length>2){
        timer = setTimeout(function(){
            lib.Start();
            
        }, 2000);
    }
});
