<?php
namespace App\Http\Controllers;

use GuzzleHttp\Client;

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
    
    public function search()
    {
        $uri = "search/commits?q=porra+author-date:%3E=2021-01-01";

        $headers = ['Accept' => 'application/vnd.github.cloak-preview'];
        $response = $this->client->request('GET', $uri, ['headers' => $headers]);

        $body = $response->getBody();
        $stringBody = (string) $body;
        dd($this->listMessages($stringBody));
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
}
