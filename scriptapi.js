const quoteContainer = document.getElementById('quote-container');
const quotesText = document.getElementById('quotes');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const generate = document.getElementById('generate');

async function getQuotes(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteText === ''){
            authorText.innerHTML = 'Unknown';
        }
        else{
            authorText.innerHTML = data.quoteAuthor;
        }

        if(data.quoteText.length > 50){
            quotesText.classList.add('long-quote');
        }
        else{
            quotesText.classList.remove('long-quote');
        }
        quotesText.innerHTML = data.quoteText;
        
        // console.log(data);
    }
    catch(error){
        getQuotes();
        console.log(error);
    }
}

function tweetQuote(){
    const quote = quotesText.innerHTML;
    const author = authorText.innerHTML;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

generate.addEventListener('click', getQuotes);
twitter.addEventListener('click', tweetQuote);

getQuotes();