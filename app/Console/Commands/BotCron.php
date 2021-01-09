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

        foreach($wordController->getRandomWords(10) as $word){
            echo "> Palavra: $word";
            echo "\r\n";

            foreach($github->search($word) as $githubMessage){
                $message = $githubMessage["message"];
                echo "  > Commit: $message";
                echo "\r\n";

                try{
                    if(!$twitter->tweetPublished($message)){
                        echo "    > Publicando tweet...";
                        echo "\r\n";
                        $twitter->tweet($message);
                    }
                    else{
                        echo "    > Tweet já publicado";
                        echo "\r\n";
                    }
                } catch(Exception $ex){
                    echo "    > Erro utilizando api do Twitter";
                    echo "\r\n";
                }
            }
            
            echo "\r\n";
        }
    }
}
