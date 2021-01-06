<?php
namespace App\Http\Controllers;

use Twitter;

class TwitterController extends Controller
{
    public function tweet()
    {
        return Twitter::postTweet(['status' => 'Postando pelo laravel', 'format' => 'json']);
    }
}
