<?php
namespace App\Http\Controllers;

class TwitterController extends Controller
{
    public function tweet()
    {
        return response()->json(['message' => 'sucesso'], 200);
    }
}
