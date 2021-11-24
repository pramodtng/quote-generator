const quoteContainer = document.getElementById('quote-container');
const quotesText = document.getElementById('quotes');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const generate = document.getElementById('generate');

let apiQuotes = [];

function newQuotes(){
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        author.textContent = "Unknown";
    }
    else{
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 50){
        quotesText.classList.add('long-quote');
    }
    else{
        quotesText.classList.remove('long-quote');
    }
    quotesText.textContent = quote.text;
}

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes);
        newQuotes();
    }
    catch(error){
        console.log(error);
    }
}

function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quotesText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

generate.addEventListener('click', newQuotes);
twitter.addEventListener('click', tweetQuote);

getQuotes();