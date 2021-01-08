<?php
namespace App\Console\Commands;

use App\Http\Controllers\GithubController;
use App\Http\Controllers\TwitterController;
use App\Http\Controllers\WordController;
use Exception;
use Illuminate\Console\Command;

class BotCron extends Command
{
    protected $signature = 'bot:cron';

    protected $description = 'Bot GitLostBR';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $github = new GithubController();
        $twitter = new TwitterController();
        $wordController = new WordController();

        foreach($wordController->getWords() as $word){
            
            foreach($github->search($word) as $githubMessage){
                $message = $githubMessage["message"];
                try{
                    if(!$twitter->tweetPublished($message)){
                        $twitter->tweet($message);
                    }
                } catch(Exception $ex){

                }
            }

            sleep(5);
        }
    }
}
