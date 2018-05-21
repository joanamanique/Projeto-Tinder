


//para fazer exercicio 2 - 11 maio 

$('.book button').click(function(){
    var opinion = $(this).attr("data-opinion");
    console.log("book" + opinion);
    $current = $('.book.active');
    $next = $current.next();


//exercicio extra - 12 maio (para depois do ultimo livro ele voltar ao primeiro)

    if($next.length == 0){
        // $next= $('.book:first-of-type'); outra forma de fazer
        $next=$('.book').first();

}

    $current.removeClass("active");
    $next.addClass("active");
});



//exercicio - 17 maio

/*criar class Library
Library tem um array de books*/

var book1 = {
    name:'Game of thrones',
    writ: 'George R. R. Martin',
    img:'GT.png',   
    desc: 'George R.R. Martins best-selling book series A Song of Ice and Fire is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic. Its the depiction of two powerful families - kings and queens, knights and renegades, liars and honest men - playing a deadly game for control of the Seven Kingdoms of Westeros, and to sit atop the Iron Throne. Martin is credited as a co-executive producer and one of the writers for the series, which was filmed in Northern Ireland and Malta',
    links:{
        0:{
            text:'Wikipedia',
            url:'https://en.wikipedia.org/wiki/Game_of_Thrones'
        },
        1:{
            text:'Wook',
            url:'https://www.wook.pt/livro/a-game-of-thrones-george-r-r-martin/11201476'
        }
    }  
}

var book2 = {
    name:'War and peace',
    writ: 'Leo Tolstoy',
    img:'GP.png',   
    desc: 'War and Peace it is regarded as a central work of world literature. War and Peace broadly focuses on Napoleons invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.',
    links:{
        0:{
            text:'Wikipedia',
            url:'https://en.wikipedia.org/wiki/War_and_Peace'
        },
        1:{
            text:'Wook',
            url:'https://www.wook.pt/livro/guerra-e-paz-lev-tolstoi/19597653'
        }
    }  
}

var book3 = {
    name:'Hunger games',
    writ: 'Suzanne Collins',
    img:'HG.png',   
    desc: 'In what was once North America, the Capitol of Panem maintains its hold on its 12 districts by forcing them each to select a boy and a girl, called Tributes, to compete in a nationally televised event called the Hunger Games. Every citizen must watch as the youths fight to the death until only one remains. District 12 Tribute Katniss Everdeen (Jennifer Lawrence) has little to rely on, other than her hunting skills and sharp instincts, in an arena where she must weigh survival against love.',
    links:{
        0:{     //0 e 1 para ser binário
            text:'Wikipedia',
            url:'https://en.wikipedia.org/wiki/The_Hunger_Games'
        },
        1:{
            text:'Wook',
            url:'https://www.wook.pt/livro/the-hunger-games-suzanne-collins/11522416'
        }
    }  
}


/*comentam os últimos 2 livros; 
vão ao css e removem o css referente à visualização dos livros(display)*/



//Exercicios - 18 Maio - inserir divs de novo através de jquery atraves do load book + fazer os livros passar de uns para outros atrves de nextbook

class library{
    constructor(){
        this.books = [book1, book2, book3];
        this.seenBooks = [];
        this.Load(this.books[0]);
    }
    Load(book){
        $('.book h1').text(book.name);
        $('.book h3').text(book.writ);
        $('.book img').attr("src", book.img);
        $('.book p').text(book.desc);

        $.each(book.links,function(i,v){
            $(".book a").eq(i).text(v.text);
            $(".book a").eq(i).attr("href",v.url);
        });
    }

    NextBook(){
        this.seenBooks.push(this.books[0]);
        this.books.splice(0,1);
        this.Load(this.books[0]);
    }
}


var lib = new library();  //ativar a classe library, só assim vai funcionar


 $('.book button').click(function(){
            lib.NextBook()
    })