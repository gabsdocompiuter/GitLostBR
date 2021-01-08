<?php
namespace App\Http\Controllers;

use Twitter;

class TwitterController extends Controller
{
    public function tweet($text)
    {
        return Twitter::postTweet([
            'status' => $text,
            'format' => 'json'
        ]);
    }

    public function tweetPublished($tweet){
        $array = json_decode(Twitter::getUserTimeline([
            'screen_name' => env('TWITTER_USER'),
            'count' => 20,
            'format' => 'json'
        ]));

        foreach($array as $item){
            if($item->text == $tweet){
                return true;
            }
        }
        return false;
    }
}
