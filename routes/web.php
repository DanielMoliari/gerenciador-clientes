<?php

use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ClienteController::class, 'index']);

Route::resource('clientes', ClienteController::class)->except
('index');
