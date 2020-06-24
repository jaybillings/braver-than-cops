import BraverThanCops from './src/message.js';
import adjectives from './data/adjectives.js';
import nouns from './data/nouns.js';

const btc = new BraverThanCops(nouns, adjectives);
const messageContainer = document.querySelector('#tweet-message');
const newTweetBtn = document.querySelector('#btn_generate-tweet');

messageContainer.value = btc.print();

newTweetBtn.addEventListener('click', e => {
  e.preventDefault();
  messageContainer.value = btc.print();
});