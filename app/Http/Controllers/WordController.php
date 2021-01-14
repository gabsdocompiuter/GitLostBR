<?php
namespace App\Http\Controllers;

class WordController extends Controller
{
    public function getRandomWords($quantity){
        $words = $this->getWords();
        $indexes = array_rand($words, $quantity);
        $array = array();

        for($i = 0; $i < $quantity; $i++){
            $index = $indexes[$i];
            array_push($array, $words[$index]);
        }
        
        return $array;
    }

    public function getWords(){
        return [
            "brocha",
            "boceta",
            "boquete",
            "buceta",
            "brioco",
            "broxa",
            // "cagado",
            "caralho",
            "cassete",
            // "coco",
            // "cu",
            "escroto",
            // "fdp",
            // "foda",
            "foda-se",
            "idiota",
            "idiotice",
            "imbecil",
            // "inferno",
            "merda",
            "otario",
            "otaria",
            "porra",
            "pentelho",
            "pentelha",
            "punheta",
            "putaria",
            "puta",
            // "puto",
            "rola",
            "safada",
            "safado",
            "trouxa",
            "troxa",
            "vadia",
            "vagabunda",
            "vagabundo",
            "xoxota"
        ];
    }
}
