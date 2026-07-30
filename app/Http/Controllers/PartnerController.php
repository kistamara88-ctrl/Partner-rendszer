<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function edit():Response{
        return Inertia::render('Partner/Profile',[
            'user' => auth()->user(),
        ]);
    }
    //
    public function update(Request $request){
        $request->validate([
            'shipping_postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'shipping_method' => 'required|string|max:255',
            
            'billing_postal_code' => 'required|string|max:20',
            'billing_city' => 'required|string|max:255',
            'billing_address' => 'required|string|max:255',
            'payment_method' => 'required|string|max:255',
            

        ]);   
        $request->user()->update($request->only([
            'shipping_postal_code',
            'city',
            'address',
            'shipping_method',

            'billing_postal_code',
            'billing_city',
            'billing_address',
            'payment_method',
        ]));
        return back()->with('succes','Adatok sikeresen mentve.');


    }
}
