<?php
namespace App\Http\Controllers;

use Twitter;

class TwitterController extends Controller
{
    public function tweet()
    {
        return Twitter::postTweet(['status' => '[TESTE PORRA]esse bot vai ficar top', 'format' => 'json']);
    }
}
