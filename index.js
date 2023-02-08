import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})

const getTargetTweet = tweetId => tweetsData.find(tweet => tweet.uuid === tweetId)

const updateTweet = (tweetId, property, value) => {
  const targetTweet = getTargetTweet(tweetId)
  targetTweet[property] = value
}

const toggleTweet = (tweetId, property) => {
  const targetTweet = getTargetTweet(tweetId)
  targetTweet[property] = !targetTweet[property]
}

function handleLikeClick(tweetId){ 
    toggleTweet(tweetId, 'isLiked')
    updateTweet(tweetId, 'likes', getTargetTweet(tweetId).likes + (getTargetTweet(tweetId).isLiked ? 1 : -1))
    render()
}

function handleRetweetClick(tweetId){
    toggleTweet(tweetId, 'isRetweeted')
    updateTweet(tweetId, 'retweets', getTargetTweet(tweetId).retweets + (getTargetTweet(tweetId).isRetweeted ? 1 : -1))
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Joshua_Ombasa`,
            profilePic: `images/ombasa.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ''
    }
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = tweet.isLiked ? 'liked' : ''
        let retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''
        
        let repliesHtml = tweet.replies
          .map(reply => `
<div class="tweet-reply">
    <div
