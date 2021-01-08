<?php
namespace App\Http\Controllers;

use Twitter;

class TwitterController extends Controller
{
    public function tweet()
    {
        return Twitter::postTweet(['status' => '[TESTE PORRA]esse bot vai ficar top', 'format' => 'json']);
    }

    public function getLastTweets(){
        return Twitter::getUserTimeline(
            [
                'screen_name' => env('TWITTER_USER'),
                'count' => 20,
                'format' => 'json',
            ]
        );
    }

    public function tweetPublished($tweet){
        $array = json_decode(Twitter::getUserTimeline(
            [
                'screen_name' => env('TWITTER_USER'),
                'count' => 20,
                'format' => 'json'
            ]
        ));

        foreach($array as $item){
            if($item->text == $tweet){
                return true;
            }
        }
        return false;
    }
}
