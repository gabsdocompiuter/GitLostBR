<?php
namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

class GithubController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.github.com',
            'verify' => false,
            'timeout'  => 2.0,
        ]);    
    }
    
    public function search($word)
    {
        try{
            $today = $this->todayDate();
            $uri = "search/commits?q=$word+author-date:%3E=$today";

            $headers = ['Accept' => 'application/vnd.github.cloak-preview'];
            $response = $this->client->request('GET', $uri, ['headers' => $headers]);

            $body = $response->getBody();
            $stringBody = (string) $body;
            return $this->listMessages($stringBody);
        } catch (RequestException $e){
            echo "  > Erro utilizado API do Github";
            echo "\r\n";
            
            return [];
        }
    }

    private function listMessages($githubBody){
        $githubJson = json_decode($githubBody);
        $githubArray = (array)$githubJson->items;

        $array = array();

        foreach($githubArray as $item){
            $sha = $item->sha;
            $message = $item->commit->message;

            if(strlen($message) <= 200){
                array_push($array, [
                    "sha" => $sha,
                    "message" => $message
                ]);
            }
        }

        return $array;
    }

    private function todayDate(){
        $today = getdate();

        $year = $today['year'];
        $month = str_pad($today['mon'], 2, '0', STR_PAD_LEFT);
        $day = str_pad($today['mday'], 2, '0', STR_PAD_LEFT);

        return "$year-$month-$day";
    }
}
