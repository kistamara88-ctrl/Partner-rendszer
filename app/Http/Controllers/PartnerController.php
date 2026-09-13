<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    private const SHIPPING_METHODS = [
        'GLS',
        'MPL',
        'Foxpost',
    ];

    private const PAYMENT_METHODS = [
        'Bankkártya',
        'Banki átutalás',
        'Utánvét',
    ];

    public function edit(): Response
    {
        return Inertia::render('Partner/Profile', [
            'user' => auth()->user(),
            'shippingMethods' => self::SHIPPING_METHODS,
            'paymentMethods' => self::PAYMENT_METHODS,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'shipping_postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'shipping_method' => ['required', Rule::in(self::SHIPPING_METHODS)],

            'billing_postal_code' => 'required|string|max:20',
            'billing_city' => 'required|string|max:255',
            'billing_address' => 'required|string|max:255',
            'payment_method' => ['required', Rule::in(self::PAYMENT_METHODS)],
        ]);

        $request->user()->update($validated);

        return back()->with('success', 'Adatok sikeresen mentve.');
    }
}