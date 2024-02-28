<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    /**
     * Cette partie nous permet de récupérer le nécessaire
     * pour afficher les souscriptions de la famille concernée.
     */
    public function index(): Response
    {
        return Inertia::render('Subscription/Index', [
            'subscriptions' => Subscriptions::all()
        ]);
    }
}